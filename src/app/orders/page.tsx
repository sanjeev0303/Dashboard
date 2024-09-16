import AnalyticsCard from "@/components/dashboard/analytic-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ordersDummyData } from "@/lib/constants";
import React from "react";
import { columns } from "./columns";

const OrdersPage = () => {
  return (
   <section className="p-6">
     <AnalyticsCard title="Products" subTitle="Show All Products">
      <Button className="mb-3 text-white">Add New Order</Button>
      <DataTable columns={columns} data={ordersDummyData} />
    </AnalyticsCard>
   </section>
  );
};

export default OrdersPage;
