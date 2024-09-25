"use client";

import React, { useState } from "react";
import { RegisterSchema } from "@/types/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AuthCard from "./auth-card";
import { useAction } from "next-safe-action/hooks";
import { RegisterAccount } from "@/server/actions/register-action";
import { FormError } from "./form-error";

type Props = {};

const RegisterForm = (props: Props) => {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");

  const { execute } = useAction(RegisterAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      } else {
        console.log("Registration successful!");
      }
    },
    onError(err) {
      setError("Registration failed. Please try again.");
    },
  });

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    execute(data);
    console.log("Register Data:", data);
  };

  return (
    <AuthCard
      title="Register for an account"
      backButtonHref="/login"
      backButtonLabel="Already have an account?"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="sanju sharma" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example@gmail.com" type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="****" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
            </div>
            <Button type="submit" className="w-full mt-6">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};

export default RegisterForm;
