import { FilePlusFilled, NoTemplateIcon } from "@/app/Components/Icons";

import { Button } from "@/app/Components/ui/button";
import ConsultForm from "./_components/form";
import Link from "next/link";
import { P } from "@/app/Components/Typography";
import { createClient } from "@/app/Lib/supabase/server";

export default async function Consult() {
  const supabase = createClient();

  const { data: templates } = await supabase.from("templates").select("*");

  return (
    <>
      {templates?.length ? (
        <ConsultForm templates={templates || []} />
      ) : (
        <div className="flex flex-col flex-grow justify-center gap-8 mx-auto items-center pb-12">
          <NoTemplateIcon className="h-20" />
          <P className="text-center w-full md:w-96 font-medium">
            You do not have any templates, create a template to kickstart the
            process
          </P>

          <Link href='/?action=add-template' legacyBehavior passHref>
            <Button
              className="w-full md:w-80 px-8 flex gap-1 items-center"
              variant="primary"
            >
              <FilePlusFilled />
              Create Template to Get Started!
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
