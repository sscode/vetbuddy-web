'use client';

import { useState } from "react";
import Nav from "../Components/Nav/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

export default function History() {
    const [sectionText] = useState("Consult: 1. Patient Information: - Name: Brian - Species: Fish 2. Reason for Visit: - Closed eyes for three days");

    const copyToClipboard = () => {
        navigator.clipboard.writeText(sectionText).then(() => {
            // Optionally show a notification or change the icon to indicate success
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    return (
        <main className="bg-white p-24">
            <Nav />
            <div className="mt-12">
                <h1 className="text-black text-3xl font-bold">History</h1>
                <div>
                    <p className="text-black">{sectionText}</p>
                    <div
                        className="w-12 p-1 bg-slate-100 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
                        onClick={copyToClipboard} // Add the onClick event handler here
                    >
                        <FontAwesomeIcon 
                            className="text-black text-2xl"
                            icon={faClipboard} 
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
