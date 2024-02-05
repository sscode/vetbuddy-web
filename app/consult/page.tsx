'use client'

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Nav from "../Components/Nav/Nav";
import RecordSettings from "../Components/Recorder/RecordSettings";
import Recorder from "../Components/Recorder/Recorder";
import { useTemplateStore } from "../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

function formatConsultTextForAPI(sectionTextList: string[]) {
  // First, transform each string by adding the index + 1 and a period at the beginning
  const formattedSections = sectionTextList.map((text, index) => `${index + 1}. ${text}`);
  // Then, join all transformed strings together with a newline character
  return formattedSections.join('\n');
}


export default function Consult() {

  const [rawTranscript, setRawTranscript] = useState<String>('');
  const [consultText, setConsultText] = useState<string>('');
  const [awsURL, setAWSURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(false);

  const sectionText = useTemplateStore(state => state.sections);

  const textForAPI = formatConsultTextForAPI(sectionText);

  useEffect(() => {
    console.log('rawTranscript change');
    if (rawTranscript) {
      consultHandler(rawTranscript);
    }
  }, [rawTranscript])

  //delete consult on new recording
  useEffect(() => {
    if (recording) {
      setRawTranscript('');
      setAWSURL('');
      setConsultText('');
    }
  }, [recording])

  const consultHandler = (transcript: any) => {
    
    fetch('https://vetbuddy.onrender.com/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript, textForAPI })
    })
    .then(res => res.json())
    .then(data => {
      console.log('data:', data.text);
      setConsultText(data.text)
      setIsLoading(false);
    })
    .catch(err => console.log(err));
  };
  

  const handleTranscription = () => {
    if (!awsURL) {
      alert('No recording URL available');
      return;
    }

    setRawTranscript('');
    setIsLoading(true);
  
    fetch(`https://vetbuddy.onrender.com/deepgram?url=${encodeURIComponent(awsURL)}`)
      .then(res => res.json())
      .then(data => {
        // Handle the transcription data
        // setConsultText(data.text);
        const transcript = data.results.channels[0].alternatives[0].transcript;
        setRawTranscript(transcript);
      })
      .catch(err => {
        setIsLoading(false);
        console.error('Error in transcription:', err);
        alert('Error in transcription');
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(consultText).then(() => {
        // Optionally show a notification or change the icon to indicate success
    }, (err) => {
        console.error('Could not copy text: ', err);
    });
};



  return (
    <main className="bg-white p-24">
        <Nav />
      <div className="mt-12">
        {/* <Header /> */}
        <h1
        className="text-black text-3xl font-bold"
        >Consult</h1>
        <Link href="/templates">Templates</Link>
        <RecordSettings />
        <Recorder 
        recording={recording}
        setRecording={setRecording}
        setAWSURL={setAWSURL}/>


        {awsURL && !consultText && (
          <button
            onClick={handleTranscription}
            className="mt-8 py-3 px-8 bg-blue-500 hover:bg-blue-700 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="px-12">
                <ClipLoader color="#000" />
              </div>
            ) : (
              "Generate Consult"
            )}
          </button>
        )}

        {consultText &&
          <div
            className="w-16 p-2 mt-4 bg-slate-300 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
            onClick={copyToClipboard} // Add the onClick event handler here
          >
            <FontAwesomeIcon 
                className="text-black text-2xl"
                icon={faClipboard} 
            />
          </div>
        }

      <pre className="text-black mt-4 whitespace-pre-wrap overflow-auto">
        {consultText}
      </pre>
      </div>
    </main>
  );
}
