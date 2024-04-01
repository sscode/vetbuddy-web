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

import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";
import React from "react";
import { Separator } from "../ui/separator";
import { User } from "@supabase/supabase-js";
import { authenticatedNavItems } from "@/app/Constants";
import { signOut } from "@/app/Actions/signout";
import { useUser } from "@/app/Hooks/UserProvider";

type Props = {};

export default function Navbar({}: Props) {
  const user = useUser();
  const signOutUser = () => {
    signOut();
  };
  return (
    <header className="w-full">
      <NavigationMenu className="w-full mx-auto max-w-none py-2 bg-white md:h-24">
        <NavigationMenuList className="w-[calc(100vw-2vw-20px)] md:w-[calc(100vw-2vw-80px)] justify-between">
          <div className="flex gap-2 items-center">
            <Image
              alt="VetBuddy Logo"
              src="/vetbuddy-logo.svg"
              width={60}
              height={60}
            />
            <Image
              className="pt-2 h-auto"
              alt="VetBuddy Logo"
              src="/vetbuddy-logo-title.svg"
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
                  <NavigationMenuItem key={index} className="hidden md:block">
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
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                      <Separator />
                      <DropdownMenuItem onClick={signOutUser}>
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
