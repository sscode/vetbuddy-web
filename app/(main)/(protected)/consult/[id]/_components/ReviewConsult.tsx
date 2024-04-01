"use client";

import { H2, P } from "@/app/Components/Typography";
import React, { useState } from "react";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/ui/select";

import ConsultResult from "../../_components/ConsultResult";
import { File } from "lucide-react";
import Recorder from "@/app/Components/Recorder";
import { Select } from "@radix-ui/react-select";
import { cn } from "@/app/Lib/utils";
import { updateConsult } from "@/app/Actions/consult";
import { useToast } from "@/app/Components/ui/use-toast";

type Props = {
  consult: any;
};

export default function ReviewConsult({ consult }: Props) {
  const { toast } = useToast();
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [consultText, setConsultText] = useState<string>(consult.content || "");

  const [audioURL, setAudioURL] = useState(consult.audio_url);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("consult", JSON.stringify(consult));
      audioBlob && formData.append("audioBlob", audioBlob);
      formData.append("consultText", consultText);

      const newConsult = await updateConsult(formData);
      setConsultText(newConsult.content);
      toast({ title: "Successfully Added Consultation" });
    } catch (error) {
      toast({
        title: "Error in Transcription. Try recording again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex gap-4 md:gap-0 flex-col md:flex-row flex-grow">
      <div
        className={
          "md:max-w-md w-full md:w-auto px-4 md:px-8 flex flex-col flex-grow relative pt-12"
        }
      >
        <H2 className="mb-6">Consult</H2>

        <Select disabled value={consult.template.id}>
          <SelectTrigger className="disabled:bg-gray-50 disabled:opacity-100 disabled:cursor-default h-12 mb-6 border rounded-md px-2 w-full drop-shadow-sm flex items-center gap-2">
            <File className={cn("text-primary-blue h-5")} />
            <div className="flex-grow text-start">
              <SelectValue
                className="flex-grow"
                placeholder="Choose a template"
              />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key={consult.template.id} value={consult.template.id}>
                {consult.template.name}
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex mb-6 w-full h-12 items-center border rounded-md overflow-hidden group-[nameinput]:">
          <div className="bg-gray-50 text-sm text-neutral-600 h-full px-4 w-1/4 min-w-fit flex items-center border-r">
            Name
          </div>
          <input
            disabled
            value={consult.name}
            placeholder="Enter details here"
            className="flex-grow border-0 rounded-none h-full focus-visible:outline-none px-3 py-2 text-sm"
          />
        </div>
        <div className="w-full h-24 mt-16"></div>
        <div className="absolute left-0 bottom-0 w-full h-24 bg-slate-50">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <Recorder
              onRecord={() => {}}
              onStop={async (audioBlobs) => {
                const audioBlob = new Blob(audioBlobs, {
                  type: "audio/wav",
                });
                setAudioBlob(audioBlob);
                setAudioURL(URL.createObjectURL(audioBlob));
                await handleSubmit();
              }}
            />
            <P className="text-center">Choose a template to record consult</P>
          </div>
        </div>
      </div>
      {audioURL && (
        <div className="flex flex-col flex-grow min-h-full bg-white md:px-8 px-4 pt-12">
          <ConsultResult
            audioURL={audioURL}
            consultText={consultText}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}
