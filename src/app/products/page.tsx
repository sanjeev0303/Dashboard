import AnalyticsCard from "@/components/dashboard/analytic-card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ordersDummyData, ProductsDummyData } from "@/lib/constants";
import React from "react";
import { columns } from "./colunms";
import AddProduct from "@/components/products/add-product-modal";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

const OrdersPage = async () => {
    const session = await auth();
    if (!session) {
        redirect("/login");
    }

    const productData = await db.product.findMany({})

    const transformedProductData = productData.map(product => ({
        ...product,
        image: product.image || "https://via.placeholder.com/150" // Use a placeholder image URL
      }));


  return (
    <section className="p-6">
        <AnalyticsCard title="Products" subTitle="Show All Products">
      <AddProduct />
      <DataTable columns={columns} data={transformedProductData} />
    </AnalyticsCard>
    </section>
  );
};

export default OrdersPage;
