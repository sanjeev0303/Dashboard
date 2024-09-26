import { z } from "zod";
import TeamList from "@/components/teams/team-list";
import { TeamSchema } from "@/types/team-schema";
import { auth } from "@/server/auth";
import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { GetRoleStatus } from "@/server/actions/get-role-status-action";

export type Team = z.infer<typeof TeamSchema>;

export default async function Page() {
  const team = await db.user.findMany({});
  const session = await auth();

  if (!session) redirect("/");

  const role = await GetRoleStatus();

  return (
    <div className="p-6">
      <TeamList data={team} role={role!} />
    </div>
  );
}
