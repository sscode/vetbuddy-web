import LoadingScreen from "@/app/Components/LoadingScreen";
import React from "react";

type Props = {};

export default function ConsultLoading({}: Props) {
  return (
    <div className="flex-grow flex flex-col items-center justify-center">
      <LoadingScreen />
    </div>
  );
}
