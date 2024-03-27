import ConsultForm from "./_components/form";
import { H2 } from "@/app/Components/Typography";
import Image from "next/image";
import { createClient } from "@/app/Lib/supabase/server";

export default async function Consult() {
  const supabase = createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select("*");

  return (
    <div className="flex flex-col max-w-4xl w-full mx-auto">
      <H2>Consult</H2>
      <ConsultForm templates={templates || []} />
    </div>
  );
}
