import React from "react";
import ReviewConsult from "./_components/ReviewConsult";
import { createClient } from "@/app/Lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function ConsultReviewPage({ params }: Props) {
  const id = params.id;

  const supabase = createClient();

  const { data } = await supabase
    .from("consults")
    .select("*, template:templates(*)")
    .eq("id", id);

  if (!data?.length) {
    return notFound();
  }

  const consult = data?.length && data[0];

  return (
    <ReviewConsult consult={consult} />
  );
}
