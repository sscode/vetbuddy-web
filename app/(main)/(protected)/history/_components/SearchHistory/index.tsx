"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React from "react";
import SearchBox from "@/app/Components/SearchBox";

type Props = {};

export default function SearchHistory({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search");

  const createQueryString = (paramArray: { name: string; value: string }[]) => {
    const params = new URLSearchParams(searchParams.toString());
    paramArray.map(({ name, value }) => {
      params.set(name, value);
    });
    return params.toString();
  };

  const handleSearch = (input: string) => {
    router.push(
      input
        ? pathname + "?" + createQueryString([{ name: "search", value: input }])
        : pathname
    );
  };

  return (
    <SearchBox
      placeholder="Search History"
      initialValue={searchQuery}
      handleSearch={handleSearch}
    />
  );
}
