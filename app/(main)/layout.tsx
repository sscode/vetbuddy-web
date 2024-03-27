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
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <Hydrate>
      <Navbar user={user} />
      <main className="w-full bg-[#FBFDFF] flex flex-col flex-grow">
        <div className="py-12 max-w-7xl w-[calc(100%-40px)] mx-auto flex flex-col flex-grow">
          {children}
        </div>
      </main>
    </Hydrate>
  );
}
