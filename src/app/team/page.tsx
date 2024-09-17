import React from 'react'
import AnalyticsCard from '@/components/dashboard/analytic-card'
import TeamCard from '@/components/teams/team-card'
import TeamList from '@/components/teams/team-list'

export interface Team {
    isAdmin: boolean
    name: string
    image: string
    isApproved: boolean
    email: string
}

async function getTeam(): Promise<Team[]>{
    const res = await fetch(
      "https://66a6d52223b29e17a1a39127.mockapi.io/team",
      { cache: "no-store" }
    );
    const data = await res.json();
    return data;
  }

const TeamPage = async() => {
    const data = await getTeam();
  return (
    <div className='p-6'>
        <TeamList data={data} />
    </div>
  )
}

export default TeamPage
