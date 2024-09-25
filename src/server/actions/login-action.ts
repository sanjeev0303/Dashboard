"use server";

import { actionClient } from "@/lib/safe-action";
import { LoginSchema } from "@/types/login-schema";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { db } from "../db";
import { RedirectType } from "next/dist/client/components/redirect";

export const loginAccount = actionClient
  .schema(LoginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    let redirectUrl = "/";
    try {
      const existingUser = await db.user.findUnique({
        where: { email: email },
      });

      if (existingUser?.email != email) {
        return {
          error: "Email not found!",
        };
      }

      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log("User found, checking image...");
      if (existingUser.image === "no-image") {
        console.log("Redirecting to onboarding...");
        redirectUrl = "/onboarding";
      } else {
        console.log("Redirecting to home...");
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              error: "Invalid Credentials!",
            };
          case "AccessDenied":
            return {
              error: error.message,
            };
          default:
            return {
              error: "An error occurred",
            };
        }
      }
    }
    revalidatePath("/");
    return redirect(redirectUrl, RedirectType.push);
  });
