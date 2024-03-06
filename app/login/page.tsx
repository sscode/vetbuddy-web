"use client";

import React, { useEffect } from "react";
import { Theme, ThemeSupa } from "@supabase/auth-ui-shared";

import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "../Lib/supabase/client";

export default function LoginPage() {
  console.log(ThemeSupa);

  const themeConfig: Theme = {
    default: {
      fonts: {
        bodyFontFamily: "Inter",
      },
      colors: {
        defaultButtonBackground: "#FFF",
      },
    },
  };

  const extendedTheme: Theme = {
    ...ThemeSupa,
    default: {
      ...ThemeSupa.default,
    },
  };

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then((a) => console.log(a));
  }, []);
  return (
    <div className="w-full max-w-64 mx-auto">
      <Auth
        supabaseClient={supabase}
        providers={["google"]}
        appearance={{ theme: extendedTheme }}
      />
    </div>
  );
}
