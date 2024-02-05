'use client'

import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
import Nav from "../Components/Nav/Nav";
import RecordSettings from "../Components/Recorder/RecordSettings";
import Recorder from "../Components/Recorder/Recorder";

export default function Consult() {

  const [rawTranscript, setRawTranscript] = useState<String>('');
  const [consultText, setConsultText] = useState<String>('');
  const [awsURL, setAWSURL] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(false);


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

    console.log('consultHandler', transcript);
    
    fetch('https://vetbuddy.onrender.com/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript })
    })
    .then(res => res.json())
    .then(data => {
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

      <pre className="mt-4 whitespace-pre-wrap overflow-auto">
        {consultText}
      </pre>



      </div>
    </main>
  );
}
