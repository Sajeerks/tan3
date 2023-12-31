import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
  } from "@tanstack/react-table";
  import  { useMemo, useState } from "react";
  import sampleData from "../MOCK_DATA.json";
  import {  ColumnWithCheckBox} from "./Columns";
import Filter from "./FilterFunction";
import { CSVLink } from "react-csv";
import { json2csv } from 'json-2-csv';
  
  const BasicTable = () => {
    const memoRizedData = useMemo(() => {
      return sampleData;
    }, []);
    const finalColum = useMemo(() => {
      return ColumnWithCheckBox;
    }, []);

    const [sorting, setsorting] = useState<any[]>([])
    const [globalFitlers, setglobalFitlers] = useState("")
    const [columnFilters, setcolumnFilters] = useState<any[]>([])
    const defaultColumn = useMemo(()=>{return {youttune:"hello world",}}, [])

    const [rowselection, setrowselection] = useState({})

    const orderArr = Object.keys( {
      select:"number",
        id: "number",
        first_name: "string",
        last_name: "string",
        email: "string",
        // gender: "string",
        // ip_address: "string",
        phone: "string",
        date: "string",
    })
    // console.log({orderArr});
    const [columOrder, setcolumOrder] = useState<string[]>([...orderArr])
    const [columnVisibilty, setcolumnVisibilty] = useState({})


  
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
        columnFilters:columnFilters,
        rowSelection:rowselection,
        columnOrder:columOrder,
        columnVisibility:columnVisibilty,
        

      },
      onSortingChange:setsorting,
      onGlobalFilterChange:setglobalFitlers,
     onColumnFiltersChange:setcolumnFilters,
     getPaginationRowModel:getPaginationRowModel(),
     onRowSelectionChange:setrowselection,
    //  enableRowSelection:row=>row.original.gender ==="male"
    enableRowSelection:true,
  onColumnOrderChange:setcolumOrder,
onColumnVisibilityChange:setcolumnVisibilty,

      

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
          <div>
        <label>
          <input
            {...{
              type: "checkbox",
              checked: tableInstance.getIsAllColumnsVisible(),
              onChange: tableInstance.getToggleAllColumnsVisibilityHandler(),
            }}
          />{" "}
          Toggle All
        </label>
        <hr />
        {tableInstance.getAllLeafColumns().map((column) => {
          return (
            <div key={column.id}>
              <label>
                <input
                  {...{
                    type: "checkbox",
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  }}
                />{" "}
                {column.id}
              </label>
            </div>
          );
        })}
      </div>
      <hr />
      <CSVLink data={csv}>Download me</CSVLink>;
      {/* <CSVDownload data={data} target="_blank" />; */}
      <hr />
      <button onClick={()=>setcolumOrder(columOrder=> {
        let arrangerArr = [...columOrder]
           arrangerArr.push(arrangerArr.shift()!)
          //  console.log({arrangerArr});
           return arrangerArr
          // return["email", "phone"]
      })}>Column Order Change</button>
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
        <hr />
        <div>
         <button onClick={()=>tableInstance.setPageIndex(0)}>Frist page</button>
         <button disabled={!tableInstance.getCanNextPage()}   onClick={()=>tableInstance.nextPage()}>next Page</button>
         <button disabled={!tableInstance.getCanPreviousPage()} onClick={()=>tableInstance.previousPage()}> prev Page</button>

         <button onClick={()=>tableInstance.setPageIndex(tableInstance.getPageCount()-1)}>Last page</button>
         
<hr />
<ul>
    <li> total no of pages = {tableInstance.getPageCount()}</li>
    <li>you are in page number ={tableInstance.options.state.pagination?.pageIndex!}</li>
    <li>jum to page = <input type="number" defaultValue={0}  onChange={e=>tableInstance.setPageIndex(Number(e.target.value))}/></li>

    <li><select value={tableInstance.options.state.pagination?.pageSize} onChange={e=>tableInstance.setPageSize(Number(e.target.value))}>
       {   [3,10,20,25,30,35,40,45,50].map(single=>{
        return (
            <option value={single} key={single}>
                {single}
            </option>
        )
       })}
         
          </select></li>
</ul>
   
 <div>
   

 </div>



        </div>

        <div>
            <h3>selectedRows</h3>
        <ul>
            {tableInstance.getSelectedRowModel().flatRows.map(singleRow=>{
                return (
                    <li key={singleRow.id}>
                        {JSON.stringify(singleRow.original)}
                    </li>
                )
            })}
            </ul>
        </div>
      </>
    );
  };
  
  export default BasicTable;
  