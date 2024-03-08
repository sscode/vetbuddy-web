import { H2 } from "@/app/Components/Typography";
import LoadingScreen from "@/app/Components/LoadingScreen";
import React from "react";

type Props = {};

export default function HistoryLoading({}: Props) {
  return (
    <>
      <H2 className="mb-12">Consult History</H2>
      <LoadingScreen />
    </>
  );
}
