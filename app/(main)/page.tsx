import { Button } from "../Components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../Lib/supabase/server";
import { FilePlus } from "lucide-react";
import { P } from "../Components/Typography";
import { FilePlusFilled, NoTemplateIcon } from "../Components/Icons";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: templates } = await supabase.from("templates").select("*");

  return (
    <div className="flex flex-col flex-grow">
      <Image
        alt="bg"
        className="fixed top-0 object-cover -z-10 left-0 w-screen h-screen bg-[#FBFDFF]"
        width={1000}
        height={1000}
        src="/curves.png"
      />
      {user ? (
        <div className="flex flex-col flex-grow justify-center gap-8 mx-auto items-center pb-12">
          {templates?.length ? (
            <div className="flex flex-col gap-4 mx-auto items-center md:w-80">
              <Link href="/templates" legacyBehavior passHref>
                <Button
                  className="w-full px-8 flex gap-1 items-center"
                  variant="primary"
                >
                  <FilePlus />
                  Create a Consult Template
                </Button>
              </Link>
              <Link href="/consult" legacyBehavior passHref>
                <Button className="w-full px-8" variant="outline">
                  Begin A Consult
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <NoTemplateIcon className="h-20" />
              <P className="text-center w-full md:w-96 font-medium">
                You do not have any templates, create a template to kickstart
                the process
              </P>
              <Link href="/templates" legacyBehavior passHref>
                <Button
                  className="w-full md:w-80 px-8 flex gap-1 items-center"
                  variant="primary"
                >
                  <FilePlusFilled />
                  Create Template to Get Started!
                </Button>
              </Link>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-1">
              More consults, less admin
            </h1>
            <p className="text-l mb-12">
              VetBuddy transcribes and creates consults from recordings inside
              your clinic.
            </p>
          </div>
          <Link href="/signup" passHref legacyBehavior>
            <Button className="md:max-w-64 mx-auto w-full" variant="primary">
              Get Started
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}
