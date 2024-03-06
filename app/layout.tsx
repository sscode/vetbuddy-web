import "./globals.css";

import Footer from "./homepage/Footer";
import Hydrate from "./Components/Hydrate";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./Components/Navbar";
import { Toaster } from "@/app/Components/ui/toaster";
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
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("No User found");
  } else {
    console.log("User", user);
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <Hydrate>
          <Navbar user />
          {/* <main className="bg-white py-12 w-[calc(100vw-40px)] max-w-5xl mx-auto"> */}
          <main className="bg-white py-12 px-8">{children}</main>
          <Footer />
        </Hydrate>
        <Toaster />
      </body>
    </html>
  );
}
