"use server";

import { createClient } from "@/app/Lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signUp(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw error;
  }

  revalidatePath("/", "layout");
}
