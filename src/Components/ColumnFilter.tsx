import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
  } from "@tanstack/react-table";
  import React, { useMemo, useState } from "react";
  import sampleData from "../MOCK_DATA.json";
  import { ColumnBasic } from "./Columns";
import Filter from "./FilterFunction";
import { CSVLink, CSVDownload } from "react-csv";
import { json2csv } from 'json-2-csv';
  
  const BasicTable = () => {
    const memoRizedData = useMemo(() => {
      return sampleData;
    }, []);
    const finalColum = useMemo(() => {
      return ColumnBasic;
    }, []);

    const [sorting, setsorting] = useState<any[]>([])
    const [globalFitlers, setglobalFitlers] = useState("")
    const [columnFilters, setcolumnFilters] = useState<any[]>([])
    const defaultColumn = useMemo(()=>{return {youttune:"hello world",}}, [])


  
    const tableInstance = useReactTable({
      data: memoRizedData,
      columns: finalColum,
      getCoreRowModel: getCoreRowModel(),
      columnResizeMode:"onChange",
      getSortedRowModel:getSortedRowModel(),
      getFilteredRowModel:getFilteredRowModel(),
      defaultColumn:defaultColumn as any,
      state:{
        sorting:sorting,
        globalFilter:globalFitlers,
        columnFilters:columnFilters
        

      },
      onSortingChange:setsorting,
      onGlobalFilterChange:setglobalFitlers,
     onColumnFiltersChange:setcolumnFilters,
      

    });
// console.log({globalFitlers});

const csvData=[ ...memoRizedData]
// console.log({csvData});
// let data = [
//     { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
//     { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
//     { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
//   ];
// memoRizedData.forEach(singleData=>{
//     csvData.push(singleData.)
// })


let csv:string ="";
(
    async()=>{

        try {
             csv = json2csv(csvData);    
        } catch (error) {
            console.log("error in IIFE ", error);
        }
      
    }
)()

// console.log(csv);

// const csvData2 = [
//     ["firstname", "lastname", "email"],
//     ["Ahmed", "Tomi", "ah@smthing.co.com"],
//     ["Raed", "Labes", "rl@smthing.co.com"],
//     ["Yezzi", "Min l3b", "ymin@cocococo.com"]
//   ];

    return (
      <>
      <hr />
      <CSVLink data={csv}>Download me</CSVLink>;
      {/* <CSVDownload data={data} target="_blank" />; */}
      <div>
     <input value={globalFitlers} onChange={e=>setglobalFitlers(e.target.value)} placeholder="global filter"/>
      </div>
      <hr />

      <hr />
        <table        
           {...{
            style: {
              width: tableInstance.getCenterTotalSize(),
            },
          }}
        
        >
          <thead>
            {tableInstance.getHeaderGroups().map((headerArr) =>{
          
   
           
        
      return    ( 
                 <tr key={headerArr.id}>
          
               {   headerArr.headers.map((columnEl) => {
                // console.log(columnEl);
               
          return     (
            
                  <th key={columnEl.id} colSpan={columnEl.colSpan}
                  
                
                  onClick = {columnEl.column.getToggleSortingHandler()}
                  
                  >
                    {columnEl.isPlaceholder? (null ):(
                   
                <div 
                // {...{
                //     className: columnEl.column.getCanSort()
                //       ? 'cursor-pointer select-none'
                //       : '',
                //     onClick: columnEl.column.getToggleSortingHandler(),
                //   }}
                
                
                >
                   {   flexRender(
                      columnEl.column.columnDef.header,
                      columnEl.getContext()
                    )
                    
                    }

            {  columnEl.column.getCanFilter()    ?(     <div>
              <Filter  column={columnEl.column} table={tableInstance}/>
          </div>
          
          ):null
       }
                </div>
                 

                 
                   
                   
                   
                    )}
                  
                    {
                      <div
                      onMouseDown={columnEl.getResizeHandler()}
                      onTouchStart={columnEl.getResizeHandler()}
                      className={`resizer ${
                        columnEl.column.getIsResizing() ? "isResizing" : ""
                      }`}
                      />
                     
                      
                    }
                    {"  "} { !columnEl.isPlaceholder &&  {asc:"UP", desc:"DOWN"}[columnEl.column.getIsSorted() as string ?? null]}
                  </th>
               
              )

                }
              
              
              )}
  
              </tr>
              )

                }
            )}
          </thead>
          <tbody>
            {tableInstance.getRowModel().rows.map((rowEL)=>
             (
              <tr key={rowEL.id}>
                {rowEL.getVisibleCells().map((cellEl)=>
                 (
                   <td key={cellEl.id}>
  
                    
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                      </td>
                ))}
  
              </tr>
            )
            )}
             
  
          </tbody>
          <tfoot>
          {tableInstance.getFooterGroups().map((headerArr) =>
              ( 
                 <tr key={headerArr.id}>
          
           {   headerArr.headers.map((columnEl) => (
            
                  <th key={columnEl.id} colSpan={columnEl.colSpan}>
                    {flexRender(
                      columnEl.column.columnDef.header,
                      columnEl.getContext()
                    )}
                    {
                      <div
                      onMouseDown={columnEl.getResizeHandler()}
                      onTouchStart={columnEl.getResizeHandler()}
                      className={`resizer ${
                        columnEl.column.getIsResizing() ? "isResizing" : ""
                      }`}
                      >
  
                      </div>
                    }
                  </th>
               
              ))}
  
              </tr>
              )
            )}
          </tfoot>
        </table>
      </>
    );
  };
  
  export default BasicTable;
  