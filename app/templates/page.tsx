'use client'

import { useState } from "react";
import Nav from "../Components/Nav/Nav";
import TemplateInput from "./TemplateInput";
import TemplateList from "./TemplateList";

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
        <h1
        className="text-black text-3xl font-bold"
        >Templates</h1>
        <TemplateList />
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
