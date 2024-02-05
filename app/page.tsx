'use client'
import { useEffect, useState } from "react";
import Recorder from "./Components/Recorder/Recorder";
import ClipLoader from "react-spinners/ClipLoader";
import Nav from "./Components/Nav/Nav";
import RecordSettings from "./Components/Recorder/RecordSettings";
import Link from "next/link";

export default function Home() {

  



  return (
    <main className="bg-white p-24">
        <Nav />
      <div className="mt-12 flex flex-col justify-center">
        <Link 
        className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        href="/templates">Create a Consult Template</Link>
        <Link 
        className="mt-8 text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
        href="/consult">Begin A Consult</Link>
      </div>
    </main>
  );
}
