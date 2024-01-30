'use client'

import { useState } from "react";
import Recorder from "./Components/recorder";

export default function Home() {

  const [consultText, setConsultText] = useState<String>('');

  const buttonHandler = () => {
    setConsultText('Loading...');
    fetch('https://vetbuddy.onrender.com/openai')
    .then(res => res.json())
    .then(data => setConsultText(data.text))
    .catch(err => console.log(err));
  }

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-screen-sm">
        <Recorder />
        <button
        onClick={buttonHandler}
        className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Get Consult</button>
<pre className="mt-4 whitespace-pre-wrap overflow-auto">
  {consultText}
</pre>


      </div>
    </main>
  );
}
