"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import MenuToggle from "./menu-toggle";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useRouteCheck from "@/hooks/useRouteCheck";
import { useMenuStore } from "@/store/toggle-menu-store";
import { Session } from "next-auth";

type NavbarProps = {
  session: Session | null;
};

const Navbar = ({ session }: NavbarProps) => {
  const { isOpen } = useMenuStore();
  const [loading, setIsLoading] = useState(true);
  const loginRoute = useRouteCheck(["login"]);
  const registerRoute = useRouteCheck(["register"]);
  const onbordingRoute = useRouteCheck(["onbording"]);
  const user = session?.user;

  useEffect(() => {
    if (!loginRoute && !registerRoute && !onbordingRoute) {
      setIsLoading(false);
    }

    console.log(user?.image);
  }, [loginRoute, registerRoute, onbordingRoute]);

  if (loading || loginRoute || registerRoute || onbordingRoute) {
    return null;
  }

  return (
    <div className="py-4 border-b">
      <div className="md:w-[95%] w-[92%] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Logo />
          <MenuToggle />
        </div>
        <div className="flex gap-8 items-center ">
          <ModeToggle />
          <span className="max-md:hidden">Welcome Back {user?.name} ✋</span>
          <Avatar>
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>
              <AvatarImage src="/fallbackimage.png" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
