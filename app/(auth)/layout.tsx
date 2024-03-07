import React, { ReactNode } from "react";

import { H1 } from "../Components/Typography";
import Link from "next/link";
import { createClient } from "../Lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    redirect("/");
  }
  return (
    <main className="flex-grow p-8">
      <Link href="/">
        <H1 className="p-4 mx-auto w-fit text-black">VetBuddy</H1>
      </Link>
      {children}
    </main>
  );
}
