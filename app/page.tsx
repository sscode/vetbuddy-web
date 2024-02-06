'use client'

import { useEffect, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import RecordSettings from "./Components/Recorder/RecordSettings";
import Recorder from "./Components/Recorder/Recorder";

export default function Home() {



  return (
    <main className="bg-white p-24">
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
