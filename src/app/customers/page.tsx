import React from "react";
import AnalyticsCard from "@/components/dashboard/analytic-card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Customers } from "@/components/dashboard/top-customer";
import { columns } from "./columns";

type Props = {};

async function getCustomers(): Promise<Customers[]> {
  const res = await fetch(
    "https://66a6d52223b29e17a1a39127.mockapi.io/Customers",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

const CustomersPage = async (props: Props) => {
  const data = await getCustomers();
  return (
    <section className="p-6">
      <AnalyticsCard
        title="Customers"
        subTitle="Showing all customers with orders"
      >
        <Button className="mb-3 text-white" >Add New Customer</Button>
        <DataTable columns={columns} data={data} />
      </AnalyticsCard>
    </section>
  );
};

export default CustomersPage;
