import Footer from "../homepage/Footer";
import Hydrate from "../Components/Hydrate";
import Navbar from "../Components/Navbar";
import { Toaster } from "@/app/Components/ui/toaster";
import { createClient } from "../Lib/supabase/server";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  return (
    <Hydrate>
      <Navbar user={session?.user} />
      <main className="bg-white py-12 px-8 flex-grow">{children}</main>
      <Footer />
      <Toaster />
    </Hydrate>
  );
}
