"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../Lib/supabase/server";

export const addTemplate = async (formData: FormData) => {
  const name = formData.get("name");
  const rawSections = formData.get("sections") as string;

  const sections = JSON.parse(rawSections);

  const supabase = createClient();
  const { data, error } = await supabase.from("templates").insert({
    name,
    sections,
  });

  if (error) {
    throw error;
  }

  revalidatePath("/");

  return data;
};

export const deleteTemplate = async (formData: FormData) => {
  const id = formData.get("id");

  const supabase = createClient();
  const { data, error } = await supabase.from("templates").delete().eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath("/");

  return data;
};

