import "./AudioPlayer.css";

import React, { MediaHTMLAttributes, useEffect, useRef, useState } from "react";

import { PauseFilled } from "@/app/Components/Icons/PauseFilled";
import { PlayFilled } from "@/app/Components/Icons/PlayFilled";
import { Span } from "@/app/Components/Typography";

interface Props extends MediaHTMLAttributes<HTMLAudioElement> {
  src: string | undefined;
}

export default function AudioPlayer({ src }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const audioElement = audioRef.current;

    const handleLoadedMetadata = () => {
      console.log("called handleLoadedMetadata");
      setDuration(audioElement.duration);
    };

    audioElement.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audioElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [audioRef, src]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      setIsPlaying(true);
      audioRef.current.play();
    } else {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  return (
    <div className="max-w-lg w-full bg-light-blue text-primary-blue">
      <audio controls className="audio-player w-full" src={src} />
    </div>
  );

  return (
    <div className="bg-light-blue flex gap-4 px-6 p-4 items-center md:max-w-lg">
      <button onClick={togglePlay}>
        {isPlaying ? (
          <PauseFilled className="size-6 p-1 text-primary-blue hover:text-blue-500/90" />
        ) : (
          <PlayFilled className="size-6 p-1 text-primary-blue hover:text-blue-500/90" />
        )}
      </button>
      <div className="flex-grow h-2 flex rounded-full overflow-hidden relative">
        <div className="bg-blue-100 h-full w-full"></div>
        <div
          style={{ width: `${(currentTime / duration) * 100}%` }}
          className="bg-primary-blue h-full rounded-full absolute top-0 left-0"
        ></div>
      </div>
      <div>
        <FormattedTime seconds={duration} />
      </div>
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        src={src}
      />
    </div>
  );
}

const FormattedTime = ({ seconds }: { seconds: number }) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return (
    <Span>
      {minutes}:{remainingSeconds < 10 ? "0" : ""}
      {remainingSeconds}
    </Span>
  );
};
