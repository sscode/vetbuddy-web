import {
  faPlay,
  faStop,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

import { ClipLoader } from "react-spinners";
import RecordButton from "./RecordButton";
import { useToast } from "../ui/use-toast";

type RecorderProps = {
  recording: boolean; // This defines recording as a boolean
  setRecording: (recording: boolean) => void; // This defines setRecording as a function that takes a boolean argument and returns void
  setAWSURL: (url: string) => void; // This defines setAWSURL as a function that takes a string argument and returns void
};

export default function Recorder({
  setAWSURL,
  setRecording,
  recording,
}: RecorderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [audioDuration, setAudioDuration] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [dots, setDots] = useState(".");

  const { toast } = useToast();

  const uploadRecording = async (audioBlob: Blob) => {
    setIsUploading(true);

    try {
      const response = await fetch(
        "https://vetbuddy.onrender.com/generate-upload-url"
      );
      const { uploadURL, key } = await response.json();

      await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "audio/wav",
        },
        body: audioBlob,
      });

      setIsUploading(false);
      toast({ title: "Recording uploaded successfully" });
      const fileAccessURL = `https://vetbuddy.s3.us-west-2.amazonaws.com/${key}`;
      setAWSURL(fileAccessURL);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  const startRecording = async () => {
    // Revoke the previous audio URL to free up memory
    if (audioURL) {
      URL.revokeObjectURL(audioURL);
      setAudioURL("");
    }

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
        setAudioURL(audioUrl);
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
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioURL(audioUrl);
      // Call the upload function
      uploadRecording(audioBlob);
    });

    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleMetadataLoaded = (
    event: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const duration = event.currentTarget.duration;
    setAudioDuration(new Date(duration * 1000).toISOString().substr(14, 5));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        // Determine the new state based on previous state
        const newDots = prevDots.length < 3 ? prevDots + "." : ".";
        return newDots;
      });
    }, 500); // Adjust time as needed

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <>
      {isUploading && <ClipLoader color="#000" />}
      {recording ? (
        <RecordButton
          onClick={stopRecording}
          icon={faStop}
          className="hover:bg-red-500"
        >
          Recording, Click to Stop
        </RecordButton>
      ) : (
        <div className="flex flex-row">
          <RecordButton onClick={startRecording} icon={faPlay}>
            Record new Consult
          </RecordButton>
          {audioURL && (
            <audio
              src={audioURL}
              controls
              className="ml-4"
              // onLoadedMetadata={handleMetadataLoaded} // Capture audio metadata when loaded
            />
          )}
        </div>
      )}
    </>
  );
}
