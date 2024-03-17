"use server";

import { createClient } from "@/app/Lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/", "layout");
}
