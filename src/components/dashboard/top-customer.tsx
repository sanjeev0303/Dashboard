'use client'

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import AnalyticsCard from "./analytic-card"
import { z } from "zod";
import { CustomersSchema } from "@/types/customer-schema";


export type topCustomerTypes = {
    id: string;
    name: string;
    orders?: number;
    image: string;
}

export const topCustomersColumns: ColumnDef<z.infer<typeof CustomersSchema>>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "orders",
      header: "Orders",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({row}) => {
        const imageUrl = row.getValue("image") as string;
        return (
          <Image
            src={imageUrl}
            alt={row.getValue("name")}
            width={50}
            height={50}
          />
        );
      }
    },
  ]

const TopCustomer = ({data}:{data: topCustomerTypes[]}) => {
  return (
    <AnalyticsCard title="Top Customers" subTitle="Showing Most Sales Products">
      <DataTable
        columns={topCustomersColumns}
        data={data}
      />
    </AnalyticsCard>
  );
};

export default TopCustomer;
