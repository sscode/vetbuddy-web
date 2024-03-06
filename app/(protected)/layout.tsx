import React, { ReactNode } from "react";

import { redirect } from "next/navigation";
import { supabase } from "../Lib/supabase/client";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    redirect("/");
  }
  return <>{children}</>;
}
