import ConsultForm from "./_components/form";
import { createClient } from "@/app/Lib/supabase/server";

export default async function Consult() {
  const supabase = createClient();

  const { data: templates } = await supabase
    .from("templates")
    .select("*");

  return (
    <div className="flex flex-col w-full flex-grow">
      <ConsultForm templates={templates || []} />
    </div>
  );
}
