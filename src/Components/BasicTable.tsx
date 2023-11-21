import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import sampleData from "../MOCK_DATA.json";
import { ColumnBasic } from "./Columns";

const BasicTable = () => {
  const memoRizedData = useMemo(() => {
    return sampleData;
  }, []);
  const finalColum = useMemo(() => {
    return ColumnBasic;
  }, []);

  const tableInstance = useReactTable({
    data: memoRizedData,
    columns: finalColum,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode:"onChange",
  });
  return (
    <>
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
