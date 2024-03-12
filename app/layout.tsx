import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "@/app/Components/ui/toaster";
import { cn } from "./Lib/utils";

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
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex flex-col min-h-screen max-w-screen"
        )}
      >
        {/* <Navbar user={session?.user} />
        <main className="bg-white py-12 px-8 flex-grow">{children}</main>
        <Footer /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
