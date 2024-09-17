'use client'

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import { ProductsDummyData } from "@/lib/constants";
import AnalyticsCard from "./analytic-card"

type TopCustomerProps = {
    data : Customers[]
}

export type Customers = {
    id: string;
    name: string;
    email: string;
    orders?: number;
    image: string;
}

export const topCustomersColumns: ColumnDef<Customers>[] = [
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

const TopCustomer = ({data}: TopCustomerProps) => {
  return (
    <AnalyticsCard title="Top Products" subTitle="Showing Most Sales Products">
      <DataTable
        columns={topCustomersColumns}
        data={data}
      />
    </AnalyticsCard>
  );
};

export default TopCustomer;
