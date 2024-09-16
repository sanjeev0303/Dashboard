import {  BarGraph } from '@/components/dashboard/bar-chart'
import { MixedGraph } from '@/components/dashboard/mixed-bar-chart'
import { PieGraph } from '@/components/dashboard/pie-chart'
import { RadarGraph } from '@/components/dashboard/radar-chart'
import Summary from '@/components/dashboard/summary'
import TopCustomer from '@/components/dashboard/top-customer'
import TopProducts from '@/components/dashboard/top-products'
import { Customers } from '@/components/dashboard/top-customer'

type Props = {}

async function getCustomers(): Promise<Customers[]>{
  const res = await fetch(
    "https://66a6d52223b29e17a1a39127.mockapi.io/Customers",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

const page = async (props: Props) => {
    const data = await getCustomers();
    const topCustomer = data.sort((a,b) => b.orders - a.orders).slice(0,6)
  return (
   <div className='p-4 grid gap-5'>
    <Summary />
    <div className='grid grid-cols-2 gap-10 md:grid-cols-1'>
    <BarGraph />
    <RadarGraph />
    </div>

    <div className='grid grid-cols-2 gap-10 md:grid-cols-1'>
    <TopProducts />
    <PieGraph />
    </div>

    <div className='grid grid-cols-2 gap-10 md:grid-cols-1'>
    <MixedGraph />
    <TopCustomer data={topCustomer} />
    </div>
   </div>
  )
}

export default page
