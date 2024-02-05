import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Hydrate from "./Components/Hydrate";

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
      <Hydrate>
          
          {children}
      </Hydrate>
          
          </body>
    </html>
  );
}
