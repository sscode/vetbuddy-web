import { Button } from "../Components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../Lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="flex flex-col flex-grow">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-1">More consults, less admin</h1>
        <p className="text-l mb-12">
          VetBuddy transcribes and creates consults from recordings inside your
          clinic.
        </p>
      </div>
      {user ? (
        <div className="grid grid-cols-2 gap-4 items-center w-full max-w-4xl mx-auto">
          <div className="justify-self-center">
            <Image src="/dogglasses.jpeg" width={300} height={300} alt="logo" />
          </div>
          <div className="flex flex-col gap-4">
            <Link href="/templates" passHref>
              <Button className="w-full" variant="outline">
                Create a Consult Template
              </Button>
            </Link>
            <Link href="/consult" passHref>
              <Button className="w-full" variant="outline">
                Begin A Consult
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Link href="/signup" passHref legacyBehavior>
          <Button className="md:max-w-64 mx-auto w-full" size="lg" variant="outline">
            Get Started
          </Button>
        </Link>
      )}

      {/* <Footer /> */}
    </div>
  );
}
