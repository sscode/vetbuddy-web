"use client";

import React, { useState } from "react";

import { Button } from "@/app/Components/ui/button";
import { File } from "lucide-react";
import { cn } from "@/app/Lib/utils";

interface Props extends React.HTMLProps<HTMLFormElement> {
  initialValue?: string | null;
  handleSearch?: (input: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  initialValue,
  handleSearch,
  placeholder,
  className,
  ...props
}: Props) {
  const [input, setInput] = useState<string>(initialValue || "");

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch && handleSearch(input);
      }}
      className={cn(
        "flex items-center gap-2 px-1 w-full md:w-[600px] border drop-shadow-sm rounded-md h-11 bg-white",
        className
      )}
    >
      <File className="text-neutral-400 h-5" />
      <input
        name="searchQuery"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={placeholder}
        className="text-sm flex-grow border-0 outline-none"
      />
      <Button type="submit" variant="primary" size="sm" className="md:px-8">
        Search
      </Button>
    </form>
  );
}
