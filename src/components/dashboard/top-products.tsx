'use client'

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import { ProductsDummyData } from "@/lib/constants";
import AnalyticsCard from "./analytic-card"

export type TopProducts = {
    id: number;
    name: string;
    revenue: number;
    price: number;
    image: string;
}

export const topProductsColumns: ColumnDef<TopProducts>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "revenue",
      header: "Revenue",
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

const TopProducts = (props: TopProducts) => {
    const topProducts = ProductsDummyData.sort((a, b) => b.revenue -a.revenue).slice(0,4)
  return (
    <AnalyticsCard title="Top Products" subTitle="Showing Most Sales Products">
      <DataTable
        columns={topProductsColumns}
        data={topProducts}
      />
    </AnalyticsCard>
  );
};

export default TopProducts;
