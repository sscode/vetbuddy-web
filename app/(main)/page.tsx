import { FilePlusFilled, NoTemplateIcon } from "../Components/Icons";

import { Button } from "../Components/ui/button";
import { HintContextProvider } from "../Hooks/HintProvider";
import HomeTableView from "./_components/TableView";
import Image from "next/image";
import Link from "next/link";
import NewTemplateModal from "../Components/NewTemplateModal";
import { P } from "../Components/Typography";
import { createClient } from "../Lib/supabase/server";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const searchQuery = searchParams?.search;

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <>
        <div className="flex flex-col flex-grow">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-1 mt-36">
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
        </div>
        <Image
          alt="bg"
          className="fixed top-0 object-cover -z-10 left-0 w-screen h-screen bg-[#FBFDFF]"
          width={1000}
          height={1000}
          src="/curves.png"
        />
      </>
    );
  }

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .ilike("name", `%${searchQuery || ""}%`);

  return (
    <div className="py-12 max-w-7xl w-[calc(100%-40px)] mx-auto flex flex-col flex-grow">
      <div className="flex flex-col flex-grow">
        {templates?.length || searchQuery ? (
          <HintContextProvider>
            <HomeTableView templates={templates || []} />
          </HintContextProvider>
        ) : (
          <div className="flex flex-col flex-grow justify-center gap-8 mx-auto items-center pb-12">
            <NoTemplateIcon className="h-20" />
            <P className="text-center w-full md:w-96 font-medium">
              You do not have any templates, create a template to kickstart the
              process
            </P>

            <NewTemplateModal>
              <Button
                className="w-full md:w-80 px-8 flex gap-1 items-center"
                variant="primary"
              >
                <FilePlusFilled />
                Create Template to Get Started!
              </Button>
            </NewTemplateModal>
          </div>
        )}
      </div>
    </div>
  );
}
