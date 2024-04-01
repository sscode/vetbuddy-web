import Hydrate from "../Components/Hydrate";
import Navbar from "../Components/Navbar";
import { UserContextProvider } from "../Hooks/UserProvider";
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
    <UserContextProvider user={user}>
      <Hydrate>
        <Navbar />
        <main className="w-full bg-[#FBFDFF] flex flex-col flex-grow">
          {children}
        </main>
      </Hydrate>
    </UserContextProvider>
  );
}
