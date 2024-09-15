    import React from 'react'
import AnalyticsCard from './analytic-card'

    type Props = {}

    const TopProducts = (props: Props) => {
      return (
      <AnalyticsCard
      title='Top Products'
      subTitle='Showing Most Sales Products'
      >
<div>Top Products</div>
      </AnalyticsCard>
      )
    }

    export default TopProducts
