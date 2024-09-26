import { BarGraph } from "@/components/dashboard/bar-chart";
import { MixedGraph } from "@/components/dashboard/mixed-bar-chart";
import { PieGraph } from "@/components/dashboard/pie-chart";
import { RadarGraph } from "@/components/dashboard/radar-chart";
import Summary from "@/components/dashboard/summary";
import TopCustomer from "@/components/dashboard/top-customer";
import TopProducts from "@/components/dashboard/top-products";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import { db } from "@/server/db";

type Props = {};

const Home = async (props: Props) => {
  const customers = await db.customers.findMany({});
  const products = await db.product.findMany({});

  const session = await auth();

  // CHECK IF A USER IS SIGNED IN
  if (!session) {
    redirect("/login");
  }

  const topCustomer = customers
    .sort((a, b) => (b.orders || 0) - (a.orders || 0))
    .slice(0, 6);

  const topProduct = products
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 6);
  return (
    <div className="p-4 grid gap-5">
      <Summary />
      <div className="grid grid-cols-2 gap-10 md:grid-cols-1">
        <BarGraph />
        <RadarGraph />
      </div>

      <div className="grid grid-cols-2 gap-10 md:grid-cols-1">
        <TopProducts
          data={topProduct.map((product) => ({
            ...product,
            image: product.image ?? "",
          }))}
        />
        <PieGraph />
      </div>

      <div className="grid grid-cols-2 gap-10 md:grid-cols-1">
        <MixedGraph />
        <TopCustomer data={topCustomer} />
      </div>
    </div>
  );
};

export default Home;
