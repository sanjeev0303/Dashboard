import {  BarGraph } from '@/components/dashboard/bar-chart'
import { MixedGraph } from '@/components/dashboard/mixed-bar-chart'
import { PieGraph } from '@/components/dashboard/pie-chart'
import { RadarGraph } from '@/components/dashboard/radar-chart'
import Summary from '@/components/dashboard/summary'
import TopCustomer from '@/components/dashboard/top-customer'
import TopProducts from '@/components/dashboard/top-products'
import React from 'react'

type Props = {}

const page = (props: Props) => {
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
    <TopCustomer />
    </div>
   </div>
  )
}

export default page
