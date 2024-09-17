"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Edit, EyeIcon, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { formatPrice } from "@/utils/formatPrice";

export type Orders = {
  id: string | number;
  orderNumber: string;
  totalAmount: number;
  data: number;
};

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order Number",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmount = row.getValue(
        "totalAmount"
      ) as number;

      return <>{formatPrice(totalAmount)}</>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const dateTimeStamp = row.getValue("date") as number;
      const dateObject = new Date(dateTimeStamp);
      return (
        <span className="text-nowrap">
          {formatDate(dateObject)}
        </span>
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
                <EyeIcon height={17} width={17} />
                <span> View Order</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpenDeleteModal(true)}
                className="gap-2"
              >
                <Trash2Icon height={17} width={17} />
                <span> Delete Order</span>
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
