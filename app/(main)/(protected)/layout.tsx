import React, { ReactNode } from "react";

import { createClient } from "@/app/Lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    redirect("/");
  }
  return <>{children}</>;
}
