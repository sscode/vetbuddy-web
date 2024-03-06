import "./globals.css";

import Footer from "./homepage/Footer";
import Hydrate from "./Components/Hydrate";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./Components/Navbar";
import { Toaster } from "@/app/Components/ui/toaster";
import { cn } from "./Lib/utils";
import { createClient } from "./Lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VetBuddy",
  description: "Record consults with AI transcriptions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={cn(inter.className, "flex flex-col min-h-screen max-w-screen")}
      >
        <Navbar user={user} />
        <main className="bg-white py-12 px-8">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
