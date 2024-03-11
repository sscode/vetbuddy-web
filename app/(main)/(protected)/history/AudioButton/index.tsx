"use client";

import { Button } from "@/app/Components/ui/button";
import React from "react";

type Props = {
  audioURL: string;
};

export default function HistoryAudioButton({ audioURL }: Props) {
  const playAudio = () => {
    const audio = new Audio(audioURL);
    audio.play();
  };
  return (
    <Button
      onClick={playAudio}
      size="sm"
      variant="ghost"
      className="text-neutral-500"
    >
      Audio
    </Button>
  );
}
