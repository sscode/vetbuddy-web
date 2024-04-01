"use client";

import { createContext, useContext } from "react";

import { User } from "@supabase/supabase-js";

const UserContext = createContext<User | undefined | null>(undefined);

export const UserContextProvider: React.FC<{
  user?: User | null;
  children: React.ReactNode;
}> = ({ user, children }) => {
  return (
    <UserContext.Provider value={user}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const currentUserContext = useContext(UserContext);

  // if (!currentUserContext) {
  //   throw new Error("useUser has to be used within <UserContextProvider>");
  // }

  return currentUserContext;
};
