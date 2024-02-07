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
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { authenticatedNavItems, landingNavItems } from "@/app/Constants";

import { Button } from "../ui/button";
import Link from "next/link";
import React from "react";
import { cn } from "@/app/Lib/utils";

type Props = {
  user?: boolean | object;
};

export default function Navbar({ user }: Props) {
  return (
    <header className="w-full">
      <NavigationMenu className="w-full mx-auto max-w-none py-2">
        <NavigationMenuList className="w-[90vw] justify-between">
          <div className="flex gap-1 max-w-[400px] flex-grow justify-start items-center">
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
          </div>

          <div className="text-lg font-bold text-center">VetBuddy.AI</div>

          <div className="flex gap-1 max-w-[400px] flex-grow justify-end items-center">
            {user ? (
              <>
                {authenticatedNavItems.map((navItem, index) => (
                  <NavigationMenuItem key={index}>
                    <Link href={navItem.link} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "p-2 font-semibold"
                        )}
                      >
                        {navItem.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <NavigationMenuTrigger className="hover:bg-transparent focus:bg-transparent hover:text-black data-[active]:bg-transparent data-[state=open]:bg-transparent">
                        <Avatar>
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Sign Out</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </NavigationMenuItem>
              </>
            ) : (
              <>
                <Link href="#" legacyBehavior passHref>
                  <Button size="sm" variant="ghost">
                    Login
                  </Button>
                </Link>
                <Link href="#" legacyBehavior passHref>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
