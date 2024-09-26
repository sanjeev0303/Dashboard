"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DataTable } from "../ui/data-table";
import { ProductsDummyData } from "@/lib/constants";
import AnalyticsCard from "./analytic-card";
import { formatPrice } from "@/utils/formatPrice";
import { z } from "zod";
import { ProductSchema } from "@/types/product-schema";

// export type TopProducts = {
//     id: number;
//     name: string;
//     revenue: number;
//     price: number;
//     image: string;
// }

export type Product = z.infer<typeof ProductSchema>;

export const topProductsColumns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "revenue",
    header: "Revenue",
    cell: ({ row }) => {
      const totalRevenue = row.getValue("revenue") as number;

      return <>{formatPrice(totalRevenue)}</>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image") as string;
      return (
        <Image
          src={imageUrl}
          alt={row.getValue("name")}
          width={50}
          height={50}
        />
      );
    },
  },
];

const TopProducts = ({ data }: { data: Product[] }) => {
  
  return (
    <AnalyticsCard title="Top Products" subTitle="Showing Most Sales Products">
      <DataTable columns={topProductsColumns} data={data} />
    </AnalyticsCard>
  );
};

export default TopProducts;
