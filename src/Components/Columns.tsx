import { createColumnHelper } from "@tanstack/react-table";
import moment from "moment";

import { useState } from "react";
import IndeterminateCheckbox from "./IndeterminateCheckbox";


export interface DataType{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    gender: string;
    ip_address: string;
    phone: string;
    date: string;
}

function emailItemEdit(row:DataType){
    if(row.email ==="qpidcock0@amazon.co.uk"){
        // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
        row.email ="xxxxxxxxxxxxxxx.com"
        // console.log("rowwwwww",row);
       return     row.email
       }
       return row.email


}

function emailFilterFunction(row:any, columId:any, filterValue:any){
    // console.log("row being called=",row);
    // console.log("columId being called=",columId);
    // console.log("filterValue being called=",filterValue);
    // console.log("row.original being called=",row.original);
    
  
    if(columId ==="email"){
      let test = row.original.email.includes(filterValue)
      return test?true:false
    }
    if(columId ==="first_name"){
      let test = row.original.email.includes(filterValue)
      return test?true:false
    }
       return false
  }

export const ColumnBasic=[




    {
        accessorKey:"id",
        header:"ID"
    },
{
    // accessorKey:"Name",
    header:"Name",
    columns:[

        {
            accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
            accessorKey:"first_name",
            header:"first_namedd + lastranme",
            // size:700,
        },
        {
            accessorKey:"last_name",
            header:"last_name"
        },

    ]
}
,


    {
        accessorKey:"email",
        header:"email",
        cell:(props:any)=><p style={{color:"red"}}>{props.getValue()}</p>,
        accessorFn:emailItemEdit, 
        filterFn:emailFilterFunction,
    },
    {
        accessorKey:"phone",
        header:"phone",
        enableGlobalFilter:true
    },
    {
        accessorKey:"date",
        header:"date",
        cell:(props:any)=><p>{moment(new Date(props.getValue())).format("MMM DD YYYY" )}</p>
    },

    // id: number;
    // first_name: string;
    // last_name: string;
    // email: string;
    // gender: string;
    // ip_address: string;
    // phone: string;
    // date: string;
]


export const ColumnWithCheckBox=[

    {
        id: "select",
        
        header: ({ table }:any) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }:any) => (
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        ),
      },
    {
        accessorKey:"id",
        header:"ID"
    },
{
    // accessorKey:"Name",
    header:"Name",
    columns:[

        {
            accessorFn: (row:DataType)=>`${row.first_name} + ${row.last_name}`,
            accessorKey:"first_name",
            header:"first_namedd + lastranme",
            // size:700,
        },
        {
            accessorKey:"last_name",
            header:"last_name"
        },

    ]
}
,


    {
        accessorKey:"email",
        cell:(props:any)=><p style={{color:"red"}}>{props.getValue()}</p>

    },
    {
        accessorKey:"phone",
        header:"phone",
        enableGlobalFilter:true
    },
    {
        accessorKey:"date",
        header:"date",
        cell:(props:any)=><p>{moment(new Date(props.getValue())).format("MMM DD YYYY" )}</p>
    },

    // id: number;
    // first_name: string;
    // last_name: string;
    // email: string;
    // gender: string;
    // ip_address: string;
    // phone: string;
    // date: string;
]