"use client";

import { Avatar, AvatarFallback } from "@/app/Components/ui/avatar";
import { H4, Span } from "@/app/Components/Typography";
import { cn, copyToClipboard } from "@/app/Lib/utils";

import AudioPlayer from "@/app/Components/AudioPlayer";
import { Button } from "@/app/Components/ui/button";
import CustomLoader from "@/app/Components/CustomLoader";
import { Files } from "lucide-react";
import React from "react";
import { useUser } from "@/app/Hooks/UserProvider";

type Props = {
  isLoading?: boolean;
  consultText?: string;
  audioURL?: string;
};

export default function ConsultResult({
  isLoading,
  consultText,
  audioURL,
}: Props) {
  const user = useUser()
  return (
    <>
      <div>
        <div className="flex items-center gap-2 w-fit mb-2">
          <Avatar>
            <AvatarFallback>{user?.email && user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <Span className="text-gray-600">You shared a recording</Span>
        </div>
        <AudioPlayer src={audioURL} />
        {!isLoading && consultText && (
          <div className="flex flex-col flex-grow gap-2 my-4">
            <div className="flex items-center justify-between">
              <H4>Suggestion</H4>
              <Button
                onClick={() => copyToClipboard(consultText)}
                size="sm"
                variant="outline"
                className="text-gray-500"
              >
                <Files className="h-4" /> Copy
              </Button>
            </div>
            <textarea
              disabled
              className={cn(
                "w-full p-2 border rounded-md text-sm flex-grow h-[240px] resize-none",
                "disabled:text-black disabled:cursor-text disabled:bg-background"
              )}
              defaultValue={consultText}
            />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="flex-grow flex flex-col justify-center items-center">
          <CustomLoader />
          <Span className="text-base font-medium text-neutral-500">
            Consult is being Generated
          </Span>
        </div>
      )}
    </>
  );
}
