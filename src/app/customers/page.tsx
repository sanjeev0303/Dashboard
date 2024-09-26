import React from "react";
import AnalyticsCard from "@/components/dashboard/analytic-card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Customers } from "@/components/dashboard/top-customer";
import { columns } from "./columns";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import AddCustomerModal from "@/components/customers/add-customer-modal";



const CustomersPage = async () => {
    const session = await auth();
    if (!session) redirect("/login");

    const customers = await db.customers.findMany({});
  return (
    <section className="p-6">
      <AnalyticsCard
        title="Customers"
        subTitle="Showing all customers with orders"
      >
        <AddCustomerModal />
        <DataTable columns={columns} data={customers} />
      </AnalyticsCard>
    </section>
  );
};

export default CustomersPage;
