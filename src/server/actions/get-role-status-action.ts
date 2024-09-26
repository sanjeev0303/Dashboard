"use server";

import { TeamSchema } from "@/types/team-schema";
import { db } from "../db";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const GetRoleStatus = async () => {
  const session = await auth();

  if (!session || !session.user?.email) {
    throw new Error("No sesson or user email found");
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      isAdmin: true,
    },
  });
  return user?.isAdmin;
};
