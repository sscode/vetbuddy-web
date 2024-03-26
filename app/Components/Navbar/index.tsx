"use client";

import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { authenticatedNavItems } from "@/app/Constants";

import { Button } from "../ui/button";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import { User } from "@supabase/supabase-js";
import useSignOut from "@/app/Hooks/useSignOut";
import Image from "next/image";
import NavLink from "./NavLink";

type Props = {
  user?: User | null;
};

export default function Navbar({ user }: Props) {
  const signOut = useSignOut();
  return (
    <header className="w-full">
      <NavigationMenu className="w-full mx-auto max-w-none py-2 bg-gray-50 md:h-24">
        <NavigationMenuList className="w-[calc(100vw-2vw-80px)] justify-between">
          <div className="flex gap-2 items-center">
            <Image
              alt="VetBuddy Logo"
              src="/vetbuddy-logo.svg"
              width={60}
              height={60}
            />
            <Image
              className="pt-2"
              alt="VetBuddy Logo"
              src="/vetbuddy-logo-text.svg"
              width={140}
              height={0}
            />
          </div>
          {/* <div className="flex gap-1 max-w-[400px] flex-grow justify-start items-center">
            {landingNavItems(!!user).map((navItem, index) => (
              <NavigationMenuItem key={index}>
                <Link href={navItem.link} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "hover:bg-transparent focus:bg-transparent hover:text-black text-slate-600"
                    )}
                  >
                    {navItem.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </div> */}

          <div className="flex gap-8 flex-grow justify-end items-center">
            {user ? (
              <>
                {authenticatedNavItems.map((navItem, index) => (
                  <NavigationMenuItem key={index}>
                    <NavLink href={navItem.link}>{navItem.title}</NavLink>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="cursor-pointer border hover:border-black focus:border-black border-transparent transition-[100ms]">
                        <AvatarFallback>
                          {user?.email && user.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem onClick={signOut}>
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" legacyBehavior passHref>
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" legacyBehavior passHref>
                  <Button size="sm" variant="primary">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
