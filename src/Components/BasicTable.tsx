import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import sampleData from "../MOCK_DATA.json"
import { ColumnBasic } from './Columns'

const BasicTable = () => {

    const memoRizedData = useMemo(()=>{return sampleData}, [])
    const finalColum = useMemo(()=>{return ColumnBasic}, [])



    const tableInstance = useReactTable({
        data:memoRizedData, 
        columns:finalColum,
        getCoreRowModel:getCoreRowModel(),
    })
  return (
    <>
    <table>
    <thead>
        {tableInstance.getHeaderGroups().map(headerArr=>  
            (  headerArr.headers.map(columnEl=>   (<tr key={columnEl.id}>
                           <th>
                             { flexRender(  columnEl.column.columnDef.header, columnEl.getContext())}
                           </th>
              </tr>)))
        )}
    </thead>
    </table>
     
    </>
  )
}

export default BasicTable