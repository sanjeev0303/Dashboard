"use client";

import React, { useState } from "react";
import { LoginSchema } from "@/types/login-schema";
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
import { loginAccount } from "@/server/actions/login-action";
import { FormError } from "./form-error";

type Props = {};

const LoginForm = (props: Props) => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");

  const { execute } = useAction(loginAccount, {
    onSuccess(data) {
      if (data.data?.error) {
        setError(data.data.error);
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    execute(data);
    setError("")
  };

  return (
    <AuthCard
      title="Welcome back!"
      backButtonHref="/register"
      backButtonLabel="Create a new account"
    >
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter email"
                        type="email"
                        autoComplete="email"
                      />
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
                      <Input {...field} placeholder="****" type="password" autoComplete="current-password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
            </div>
            <Button
              type="submit"
              className="w-full mt-6 font-semibold text-md text-white"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </AuthCard>
  );
};

export default LoginForm;
