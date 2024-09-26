"use client";

import { Team } from "@/types/team-schema";
import TeamCard from "./team-card";

interface TeamListProps {
  data: Team[];
  role: boolean;
}

const TeamList = ({ data, role }: TeamListProps) => {
  const approvedMembers = data.filter((member) => member.isApproved);
  const pendingMembers = data.filter((member) => !member.isApproved);

  return (
    <div className="space-y-16">
      <div>
        <h2 className="mb-4">Approved Members</h2>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-10">
          {approvedMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              isPending={false}
              role={role}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4">Pending Members</h2>
        <div className="grid grid-cols-4 md:grid-cols-2 gap-8">
          {pendingMembers.map((member, index) => (
            <TeamCard
              key={index}
              member={member}
              isPending={true}
              role={role}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamList;
