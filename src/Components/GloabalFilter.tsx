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
  
  const BasicTable = () => {
    const memoRizedData = useMemo(() => {
      return sampleData;
    }, []);
    const finalColum = useMemo(() => {
      return ColumnBasic;
    }, []);

    const [sorting, setsorting] = useState<any[]>([])
    const [globalFitlers, setglobalFitlers] = useState("")
  
    const tableInstance = useReactTable({
      data: memoRizedData,
      columns: finalColum,
      getCoreRowModel: getCoreRowModel(),
      columnResizeMode:"onChange",
      getSortedRowModel:getSortedRowModel(),
      getFilteredRowModel:getFilteredRowModel(),
      state:{
        sorting:sorting,
        globalFilter:globalFitlers
      },
      onSortingChange:setsorting,
      onGlobalFilterChange:setglobalFitlers,
    
      

    });
// console.log({globalFitlers});


    return (
      <>
      <div>
     <input value={globalFitlers} onChange={e=>setglobalFitlers(e.target.value)} placeholder="global filter"/>
      </div>
      <hr />
        <table        
           {...{
            style: {
              width: tableInstance.getCenterTotalSize(),
            },
          }}
        
        >
          <thead>
            {tableInstance.getHeaderGroups().map((headerArr) =>
              ( 
                 <tr key={headerArr.id}>
          
               {   headerArr.headers.map((columnEl) => (
            
                  <th key={columnEl.id} colSpan={columnEl.colSpan}
                  
                  onClick={columnEl.column.getToggleSortingHandler()}
                  
                  
                  >
                    {columnEl.isPlaceholder? (null ):(
  
                    flexRender(
                      columnEl.column.columnDef.header,
                      columnEl.getContext()
                    )
  
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
               
              ))}
  
              </tr>
              )
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
  