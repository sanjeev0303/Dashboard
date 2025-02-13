"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

type BackButtonProps = {
  href: string ;
  label: string;
};

const BackButton = ({ href, label }: BackButtonProps) => {
    const validHref: string = href ?? "/login"
  return (
    <Button
    asChild
    variant={"link"}
    className="font-medium w-full"
    >
        <Link  aria-label={label} href={validHref}>
        {label}
        </Link>
    </Button>
  )
};

export default BackButton;
