'use client'

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Nav from "../Components/Nav/Nav";
import RecordSettings from "../Components/Recorder/RecordSettings";
import Recorder from "../Components/Recorder/Recorder";
import TemplateInput from "./TemplateInput";

export default function Templates() {

    const [sections, setSections] = useState(["hi", 
    "hello",]);

    const sectionHandler = () => {
        //random string
        const randomString = Math.random().toString(36).substring(4);

        setSections([...sections, randomString]);
    }

  return (
    <main className="bg-white p-24">
        <Nav />
      <div className="mt-12">
        {/* <Header /> */}
        <h1
        className="text-black text-3xl font-bold"
        >Templates</h1>
        {sections.map((index: any) => {
            return (
                <div key={index}>
                    <TemplateInput />
                </div>
            )
        })}
        <div className="mt-12">
            <button
            onClick={sectionHandler}
            className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >Add New Section</button>
        </div>
        <div className="mt-4">
            <button
            className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >Save Template</button>
        </div>
      </div>
    </main>
  );
}
