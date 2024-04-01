import { MicFilled, MicOffFilled } from "@/app/Components/Icons";
import React, { useRef, useState } from "react";

import { cn } from "@/app/Lib/utils";

type Props = {
  disabled?: boolean
  onRecord: (audioUrl:string) => void
  onStop: (blobs:Blob[]) => void
};

export default function Recorder({ disabled, onRecord, onStop }: Props) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [recording, setRecording] = useState<boolean>(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      // Reset audio chunks
      audioChunksRef.current = [];

      mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
        audioChunksRef.current.push(event.data);
      });

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        onRecord(audioUrl)
      });

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error in starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.addEventListener("stop", () => {
      onStop(audioChunksRef.current)
    });

    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <button type="button" onClick={recording ? stopRecording : startRecording} disabled={disabled} className={cn("bg-primary-blue hover:bg-blue-500/90 disabled:bg-slate-50 disabled:cursor-not-allowed transition-[100ms] flex items-center justify-center border size-24 rounded-full")}>
      {disabled ? (
        <MicOffFilled className="size-14 text-gray-400" />
      ) : (
        recording ?
          <div className="size-12 rounded-sm bg-white" /> :
          <MicFilled className="size-14 text-white" />
      )}
    </button>
  );
}
