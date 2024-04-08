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
    <main className="flex-grow px-4 py-8 mt-24">
      <Link href="/">
        <H1 className="p-4 mx-auto w-fit text-primary-blue">VetBuddy.AI</H1>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[480px]">
        {children}
      </div>
    </main>
  );
}
