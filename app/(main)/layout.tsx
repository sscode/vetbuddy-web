import Hydrate from "../Components/Hydrate";
import Navbar from "../Components/Navbar";
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
      <main className="py-12 px-8 flex flex-col flex-grow">{children}</main>
    </Hydrate>
  );
}
