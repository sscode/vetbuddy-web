'use client'

import { useEffect, useState } from "react";
import Recorder from "./Components/recorder";
import Header from "./Components/Header";
import ClipLoader from "react-spinners/ClipLoader";

export default function Home() {

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
    <main className="flex flex-col items-center justify-between p-24">
      <div className="flex flex-col max-w-screen-sm">
        <Header />
        <Recorder 
        recording={recording}
        setRecording={setRecording}
        setAWSURL={setAWSURL}/>
        {awsURL && !consultText && (
          <button
            onClick={handleTranscription}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="#ffffff" /> // Using ClipLoader spinner
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
