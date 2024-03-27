"use client"

import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { useState } from "react";

type ContextType = {
  hint: string;
  setHint: Dispatch<SetStateAction<string>>;
};

const HintContext = createContext<ContextType>({
  hint: "",
  setHint: () => {},
});

export const HintContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hint, setHint] = useState<string>("This is a hint text to help user.");

  return (
    <HintContext.Provider value={{ hint, setHint }}>
      {children}
    </HintContext.Provider>
  );
};

export const useHintContext = () => {
  const currentHintContext = useContext(HintContext);

  if (!currentHintContext) {
    throw new Error(
      "useHintContext has to be used within <HintContextProvider>"
    );
  }

  return currentHintContext;
};