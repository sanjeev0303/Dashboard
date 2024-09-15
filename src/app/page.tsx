import Summary from '@/components/dashboard/summary'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
   <div className='p-4 grid gap-5'>
    <Summary />
   </div>
  )
}

export default page
