"use client";
import { P } from "@/app/Components/Typography";
import { useHintContext } from "@/app/Hooks/HintProvider";
import React from "react";

type Props = {};

export default function HintText({}: Props) {
  const { hint } = useHintContext();
  return (
    <P className="text-slate-800">
      {hint || "This is a hint text to help user"}
    </P>
  );
}
