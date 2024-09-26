"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import EditProduct from "@/components/products/edit-product-modal";
import DeleteProduct from "@/components/products/delete-product-modal";
import { z } from "zod";
import { ProductSchema } from "@/types/product-schema";

export const columns: ColumnDef<z.infer<typeof ProductSchema>>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const totalPrice = row.getValue("price") as number;

      return <>{formatPrice(totalPrice)}</>;
    },
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
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const productId = product.id;
      const [editModalOpen, setEditModalOpen] = useState(false);
      const [deleteModalOpen, setDeleteModalOpen] = useState(false);

      if (!productId) {
        return;
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => setEditModalOpen(true)}>
                Edit Product
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDeleteModalOpen(true)}>
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden">
            <EditProduct
              id={productId}
              open={editModalOpen}
              onOpenChange={setEditModalOpen}
            />
            <DeleteProduct
              id={productId}
              open={deleteModalOpen}
              onOpenChange={setDeleteModalOpen}
            />
          </div>
        </>
      );
    },
  },
];
