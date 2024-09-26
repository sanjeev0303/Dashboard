import AnalyticsCard from "@/components/dashboard/analytic-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ordersDummyData } from "@/lib/constants";
import React from "react";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import AddOrder from "@/components/orders/add-order-modal";

const OrdersPage = async () => {
    const session = await auth();
  if (!session) redirect("/login");
  const orders = await db.orders.findMany({});
  return (
   <section className="p-6">
     <AnalyticsCard title="Products" subTitle="Show All Products">
      <AddOrder />
      <DataTable columns={columns} data={orders} />
    </AnalyticsCard>
   </section>
  );
};

export default OrdersPage;
