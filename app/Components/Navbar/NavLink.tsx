import Link from "next/link";
import React, { useMemo } from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { Url } from "next/dist/shared/lib/router/router";
import { cn } from "@/app/Lib/utils";
import { usePathname } from "next/navigation";
import { MoveRight } from "lucide-react";

type Props = {
  children: React.ReactNode;
  href: Url;
};

export default function NavLink({ children, href }: Props) {
  const pathname = usePathname();

  const active = useMemo(() => {
    return href === "/templates" || pathname === href;
  }, [pathname]);

  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={cn(
          active ? "text-primary-blue font-bold" : "text-neutral-400 font-normal",
          "p-2 text-sm flex gap-1 items-center relative hover:text-primary-blue transition-[100ms]"
        )}
      >
        <MoveRight
          className={cn(
            active ? "opacity-100 -left-5" : "opacity-0 left-0",
            "absolute -left-5 transition-[100ms]"
          )}
        />
        {children}
      </NavigationMenuLink>
    </Link>
  );
}
