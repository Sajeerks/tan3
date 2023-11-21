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
        header:"email"
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
        header:"email"
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