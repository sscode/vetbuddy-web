'use client'
import { useEffect, useState } from "react";
import Recorder from "./Components/Recorder/Recorder";
import ClipLoader from "react-spinners/ClipLoader";
import Nav from "./Components/Nav/Nav";
import RecordSettings from "./Components/Recorder/RecordSettings";
import Link from "next/link";
import { useCounterStore } from "./store";

export default function Home() {

  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);


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
      <div>
        <p
        className="text-black"
        >{count}</p>
        <button onClick={increment} className="text-black bg-slate-400 p-2 rounded mr-2">Inc</button>
        <button onClick={decrement} className="text-black bg-slate-400 p-2 rounded mr-2">Dec</button>
      </div>
    </main>
  );
}
