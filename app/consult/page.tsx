"use client";

import { H2, P } from "../Components/Typography";
import {
  faCheckSquare,
  faClipboard,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useTemplateStore, useTemplatesListStore } from "../store";

import { Button } from "../Components/ui/button";
import { Card } from "../Components/ui/card";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import RecordSettings from "../Components/Recorder/RecordSettings";
import Recorder from "../Components/Recorder/Recorder";
import { jsPDF } from "jspdf";

function formatConsultTextForAPI(sections: Array<{name: string, isChecked: boolean}>) {
  // Transform each section with its index and name. Prepend special instructions if isChecked is true.
  const formattedSections = sections.map((section, index) => {
    const prefix = section.isChecked ? "**SPECIAL INSTRUCTIONS**\n" : "";
    return `${prefix}${index + 1}. ${section.name}`;
  });

  // Join all transformed strings together with a newline character
  return formattedSections.join("\n");
}


function formatConsultTextRender(APIText: string) {
  //add a newline after each section. each section ends with \n
  return APIText.split("\n").join("\n\n");
}

export default function Consult() {
  const { templates } = useTemplatesListStore();

  const [rawTranscript, setRawTranscript] = useState<String>("");
  const [consultText, setConsultText] = useState<string>("");
  const [awsURL, setAWSURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selected, setSelected] = useState<number>(0);
  const [activeTemplate, setActiveTemplate] = useState(templates[selected]);

  // const templateStore = useTemplateStore();
  // const textForAPI = formatConsultTextForAPI(templateStore.sections);
  
  useEffect(() => {
    console.log("rawTranscript change");
    if (rawTranscript) {
      consultHandler(rawTranscript);
    }
  }, [rawTranscript]);
  
  //update active template
  useEffect(() => {
    console.log("selected change", templates[selected]);
    setActiveTemplate(templates[selected]);
  }, [selected]);

  //delete consult on new recording
  useEffect(() => {
    if (recording) {
      setRawTranscript("");
      setAWSURL("");
      setConsultText("");
    }
  }, [recording]);

  const consultHandler = (transcript: any) => {
    // console.log("textForAPI", templates[selected].sections);
    // return;
    const textForAPI = formatConsultTextForAPI(templates[selected].sections);
    console.log("textForAPI", textForAPI);


    fetch("https://vetbuddy.onrender.com/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript, textForAPI }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data.text);
        setConsultText(formatConsultTextRender(data.text));
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleTranscription = () => {
    if (!awsURL) {
      alert("No recording URL available");
      return;
    }

    setRawTranscript("");
    setIsLoading(true);

    fetch(
      `https://vetbuddy.onrender.com/deepgram?url=${encodeURIComponent(awsURL)}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Handle the transcription data
        // setConsultText(data.text);
        const transcript = data.results.channels[0].alternatives[0].transcript;
        setRawTranscript(transcript);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error in transcription:", err);
        alert("Error in transcription");
      });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(consultText).then(
      () => {
        // Optionally show a notification or change the icon to indicate success
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const downloadPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add text to PDF
    doc.text(consultText, 10, 30); // Adjust the position as needed

    //get date in format DDMMYYYY
    const date = new Date();
    let day = date.getDate();

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let zero = "";
    if (day < 10) {
      zero = `0`;
    }
    const dateString = `${zero}${day}${month}${year}`;

    // Save the PDF
    doc.save(`vetbuddy-${dateString}.pdf`);
  };

  return (
    <>
      <div className="mt-12">
        {/* <Header /> */}
        <H2>New Consult</H2>
        {/* <RecordSettings /> */}
        <Card className="bg-slate-50 p-4 w-64 space-y-1 mt-8">
          {templates.map((template, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              className="gap-2 w-full justify-between"
              onClick={() => {setSelected(index)}}
            >
              <span className="font-medium text-slate-600">{template.name}</span>
              {selected === index && <FontAwesomeIcon className="text-xl text-blue-500" icon={faCheckSquare} />}
            </Button>
          ))}
        </Card>
        <Recorder
          recording={recording}
          setRecording={setRecording}
          setAWSURL={setAWSURL}
        />
        {/* Displaying activeTemplate properties */}
        <div className="mt-8">
        {/* <Card className="bg-slate-50 p-4 space-y-4">
        {(activeTemplate.sections || []).map((section, index) => (
          <div key={index} className="flex flex-col">
            <P className="font-semibold">{section.name}</P>
            <P>{section.isChecked ? 'Checked' : 'Not Checked'}</P>
          </div>
        ))}
        </Card> */}
        </div>
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

        {consultText && (
          <div className="flex">
            <div
              className="w-16 p-2 mt-4 mr-2 bg-slate-300 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
              onClick={copyToClipboard} // Add the onClick event handler here
            >
              <FontAwesomeIcon
                className="text-black text-2xl"
                icon={faClipboard}
              />
            </div>
            <div
              className="w-16 p-2 mt-4 bg-slate-300 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
              onClick={downloadPDF} // Add the onClick event handler here
            >
              <FontAwesomeIcon
                className="text-black text-2xl"
                icon={faFilePdf}
              />
            </div>
          </div>
        )}

        <pre className="text-black mt-4 whitespace-pre-wrap overflow-auto">
          {consultText}
        </pre>
      </div>
    </>
  );
}
