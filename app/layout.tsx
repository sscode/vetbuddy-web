import "./globals.css";

import Hydrate from "./Components/Hydrate";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Navbar from "./Components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VetBuddy",
  description: "Record consults with AI transcriptions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar user />
        <Hydrate>
          <main className="bg-white py-12 w-[90vw] max-w-5xl mx-auto">{children}</main>
        </Hydrate>
      </body>
    </html>
  );
}
