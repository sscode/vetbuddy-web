"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/Components/ui/form";
import { H2, P } from "@/app/Components/Typography";
import { Template, useTemplateListStore } from "@/app/store";
import {
  copyToClipboard,
  downloadPDF,
  formatConsultTextForAPI,
  formatConsultTextRender,
} from "@/app/Lib/utils";
import {
  faCheckSquare,
  faClipboard,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import { Button } from "@/app/Components/ui/button";
import { Card } from "@/app/Components/ui/card";
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@/app/Components/ui/input";
import Recorder from "@/app/Components/Recorder/Recorder";
import { createClient } from "@/app/Lib/supabase/client";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Consult() {
  const { templates } = useTemplateListStore();

  const [rawTranscript, setRawTranscript] = useState<String>("");
  const [consultText, setConsultText] = useState<string>("");
  const [awsURL, setAWSURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selected, setSelected] = useState<Template | null>(
    templates?.length ? templates[0] : null
  );

  const { toast } = useToast();

  // useEffect(() => {
  //   console.log("rawTranscript change");
  //   if (rawTranscript) {
  //     consultHandler(rawTranscript);
  //   }
  // }, [rawTranscript]);

  //delete consult on new recording
  useEffect(() => {
    if (recording) {
      setRawTranscript("");
      setAWSURL("");
      setConsultText("");
    }
  }, [recording]);

  // const consultHandler = (transcript: any) => {
  //   if (!selected) return;
  //   const textForAPI = formatConsultTextForAPI(selected.sections);
  //   console.log("textForAPI", textForAPI);

  //   fetch("https://vetbuddy.onrender.com/openai", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ transcript, textForAPI }),
  //   })
  //     .then((res) => res.json())
  //     .then(async (data) => {
  //       console.log("data:", data.text);
  //       setConsultText(formatConsultTextRender(data.text));
  //       await updateDatabase(data.text);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleTranscription = () => {
  //   if (!awsURL) {
  //     alert("No recording URL available");
  //     return;
  //   }

  //   setRawTranscript("");
  //   setIsLoading(true);

  //   fetch(
  //     `https://vetbuddy.onrender.com/deepgram?url=${encodeURIComponent(awsURL)}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // Handle the transcription data
  //       // setConsultText(data.text);
  //       const transcript = data.results.channels[0].alternatives[0].transcript;
  //       setRawTranscript(transcript);
  //     })
  //     .catch((err) => {
  //       setIsLoading(false);
  //       console.error("Error in transcription:", err);
  //       alert("Error in transcription");
  //     });
  // };

  const handleSubmit = async () => {
    if (!selected) return;
    if (!awsURL) {
      alert("No recording URL available");
      return;
    }

    setRawTranscript("");
    setIsLoading(true);
    try {
      const deepgramRes = await fetch(
        `https://vetbuddy.onrender.com/deepgram?url=${encodeURIComponent(
          awsURL
        )}`
      );
      const deepgramdata = await deepgramRes.json();
      const transcript =
        deepgramdata.results.channels[0].alternatives[0].transcript;

      // consultHandler(rawTranscript);
      const textForAPI = formatConsultTextForAPI(selected.sections);
      console.log("textForAPI", textForAPI);

      const openaiRes = await fetch("https://vetbuddy.onrender.com/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript, textForAPI }),
      });
      const openaiData = await openaiRes.json();
      console.log("data:", openaiData.text);

      const { error } = await supabase.from("consults").insert({
        template_id: selected?.id,
        name: form.getValues().name,
        audio_url: awsURL,
        transcript,
        content: consultText,
      });
      if (error) {
        throw error;
      }
      setConsultText(formatConsultTextRender(openaiData.text));
      toast({ title: "Successfully Added Consultation" });
    } catch (error) {
      console.error("Error in transcription:", error);
      toast({ title: "Error in Transcription", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const supabase = createClient();

  const formSchema = z.object({
    template_id: z.string(),
    name: z.string().min(1, "Please enter your/patient's name."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template_id: "",
      name: "",
    },
  });

  return (
    <div className="mt-12">
      {/* <Header /> */}
      <H2>New Consult</H2>
      {/* <RecordSettings /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            handleSubmit();
          })}
          className="flex flex-col gap-4 my-8"
        >
          <div>
            <FormLabel>Template</FormLabel>
            <Card className="bg-slate-50 p-4 w-full md:max-w-80 space-y-1">
              {templates?.length ? (
                templates.map((template, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="gap-2 w-full justify-between"
                    onClick={() => {
                      setSelected(template);
                    }}
                  >
                    <span className="font-medium text-slate-600">
                      {template.name}
                    </span>
                    {selected === template && (
                      <FontAwesomeIcon
                        className="text-xl text-blue-500"
                        icon={faCheckSquare}
                      />
                    )}
                  </Button>
                ))
              ) : (
                <P className="text-red-500 font-medium">Please Create a Template first</P>
              )}
            </Card>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:max-w-80">
                <FormLabel>Patient's name</FormLabel>
                <FormControl>
                  <Input placeholder="Tom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Recorder
            recording={recording}
            setRecording={setRecording}
            setAWSURL={setAWSURL}
          />
          {/* Displaying activeTemplate properties */}
          {/* <div className="mt-8">
            <Card className="bg-slate-50 p-4 space-y-4">
        {(activeTemplate.sections || []).map((section, index) => (
          <div key={index} className="flex flex-col">
            <P className="font-semibold">{section.name}</P>
            <P>{section.isChecked ? 'Checked' : 'Not Checked'}</P>
          </div>
        ))}
        </Card>
          </div> */}
          {awsURL && !consultText && (
            <Button
              className="w-full md:max-w-80"
              variant="primary"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <div className="px-12">
                  <ClipLoader color="#000" />
                </div>
              ) : (
                "Generate Consult"
              )}
            </Button>
          )}
        </form>
      </Form>

      {consultText && (
        <div className="flex">
          <div
            className="w-16 p-2 mt-4 mr-2 bg-slate-300 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
            onClick={() => copyToClipboard(consultText)} // Add the onClick event handler here
          >
            <FontAwesomeIcon
              className="text-black text-2xl"
              icon={faClipboard}
            />
          </div>
          <div
            className="w-16 p-2 mt-4 bg-slate-300 flex justify-center items-center rounded-md cursor-pointer hover:bg-slate-200 transition-all duration-300 ease-in-out"
            onClick={() => downloadPDF(consultText)} // Add the onClick event handler here
          >
            <FontAwesomeIcon className="text-black text-2xl" icon={faFilePdf} />
          </div>
        </div>
      )}

      <pre className="text-black mt-4 whitespace-pre-wrap overflow-auto">
        {consultText}
      </pre>
    </div>
  );
}
