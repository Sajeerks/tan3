import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import  { useEffect, useMemo, useState } from "react";
import sampleData from "../MOCK_DATA.json";
import { ColumnBasic } from "./Columns";

const BasicTable = () => {
  const memoRizedData = useMemo(() => {
    return sampleData;
  }, []);
  const finalColum = useMemo(() => {
    return ColumnBasic;
  }, []);

  const [namefilter, setnamefilter] = useState("")
  const [emailFilter, setemailFilter] = useState("")


  const tableInstance = useReactTable({
    data: memoRizedData,
    columns: finalColum,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    columnResizeMode:"onChange",
  });

  useEffect(() => {
  tableInstance.getHeaderGroups().map(headerArr=>{
  
       headerArr.headers.map(columnEl=>{
              
                 if(columnEl.column.id ==="email"){
                  // console.log( "columnEl.column.getFilterValue()--",columnEl.column.getFilterValue());

                  columnEl.column.setFilterValue(emailFilter || "")
                  // columnEl.column.setFilterValue("")

                 }
                 if(columnEl.column.id ==="first_name"){
                    columnEl.column.setFilterValue(namefilter || "")
                    // columnEl.column.setFilterValue("")
                 }
                
             })

  })

  
  }, [emailFilter, namefilter])
  
  return (
    <>
    <input type="text"  placeholder=" name fitler" value={namefilter} onChange={e=>setnamefilter(e.target.value)}/>

    <input type="text"  placeholder=" email fitler" value={emailFilter} onChange={e=>setemailFilter(e.target.value)}/>
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
          
                <th key={columnEl.id} colSpan={columnEl.colSpan}>
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
                    >

                    </div>
                  }
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
