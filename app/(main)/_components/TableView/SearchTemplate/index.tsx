"use client";

import React, { useState } from "react";
import { File } from "lucide-react";
import { Button } from "@/app/Components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchTemplate() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search")

  const [input, setInput] = useState(searchQuery || "");

  const createQueryString = (paramArray: { name: string; value: string }[]) => {
    const params = new URLSearchParams(searchParams.toString());
    paramArray.map(({ name, value }) => {
      params.set(name, value);
    });
    return params.toString();
  };

  const handleSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push(
      input
        ? pathname + "?" + createQueryString([{ name: "search", value: input }])
        : pathname
    );
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 px-1 w-full md:w-[600px] border drop-shadow-sm rounded-md h-11 bg-white"
    >
      <File className="text-neutral-400 h-5" />
      <input
        name="searchQuery"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search a template"
        className="text-sm flex-grow border-0 outline-none"
      />
      <Button type="submit" variant="primary" size="sm" className="md:px-8">
        Search
      </Button>
    </form>
  );
}
