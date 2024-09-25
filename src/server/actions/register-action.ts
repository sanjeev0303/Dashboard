"use server";

import { actionClient } from "@/lib/safe-action";
import { RegisterSchema } from "@/types/register-schema";
import bcrypt from "bcrypt";
import { db } from "../db";
import { revalidatePath } from "next/cache";

export const RegisterAccount = actionClient
  .schema(RegisterSchema)
  .action(async ({ parsedInput: { email, password, name } }) => {
    const userPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return {
        error: "User already exist!",
      };
    }

    await db.user.create({
      data: {
        userName: name,
        name: name,
        email: email,
        hashedPassword: userPassword,
      },
    });
revalidatePath("/")
  });
