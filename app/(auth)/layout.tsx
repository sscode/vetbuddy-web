import React, { ReactNode } from "react";

import { redirect } from "next/navigation";
import { supabase } from "../Lib/supabase/server";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect("/");
  }
  return <>{children}</>;
}
