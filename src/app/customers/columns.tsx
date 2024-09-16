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

export type Customers = {
  id: number;
  name: string;
  email: string;
  order?: number;
  image: string;
};

export const columns: ColumnDef<Customers>[] = [
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
      const [openDeletemodal, setOpenDeleteModal] = useState(false);
      const customers = row.original;
      const customerId = customers.id;

      if (!customerId) {
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
              <DropdownMenuItem className="gap-2">
                <Edit height={17} width={17} />
                <span> Edit Customer</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenDeleteModal(true)}
                className="gap-2"
              >
                <Trash2Icon height={17} width={17} />
                <span> Delete Customer</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <div className="hidden">
                <DeleteCustomerModal
                  id={customerId}
                  open={openDeletemodal}
                  onOpenChange={setOpenDeleteModal}
                />
              </div> */}
        </>
      );
    },
  },
];
