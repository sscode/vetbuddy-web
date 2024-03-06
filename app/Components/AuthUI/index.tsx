"use client";

import { Theme, ThemeSupa } from "@supabase/auth-ui-shared";

import { Auth } from "@supabase/auth-ui-react";
import React from "react";
import { createClient } from "@/app/Lib/supabase/client";
import { usePathname } from "next/navigation";

type Props = {
  view?: "sign_in" | "sign_up" | "forgotten_password";
};

enum pathToView {
  login = "sign_in",
  signup = "sign_up",
}

export default function AuthUI({}: Props) {
  const supabase = createClient();
  const path = usePathname().split("/")[1] as "login" | "signup";

  const view = pathToView[path];

  const extendedTheme: Theme = {
    default: {
      fonts: {
        bodyFontFamily: "__Inter_aaf875, __Inter_Fallback_aaf875",
        buttonFontFamily: "__Inter_aaf875, __Inter_Fallback_aaf875",
        inputFontFamily: "__Inter_aaf875, __Inter_Fallback_aaf875",
        labelFontFamily: "__Inter_aaf875, __Inter_Fallback_aaf875",
      },
      radii: {
        borderRadiusButton: "8px",
        buttonBorderRadius: "8px",
        inputBorderRadius: "8px",
      },
      colors: {
        brand: "hsl(var(--foreground))",
        brandAccent: "rgba(0,0,0,0.8)",
      },
    },
  };

  const redirectUrl = location.origin + "/";

  return (
    <div className="w-full max-w-64 mx-auto min-h-[400px] flex flex-col">
      <Auth
        supabaseClient={supabase}
        providers={[]}
        appearance={{
          theme: ThemeSupa,
          variables: extendedTheme,
          style: {
            anchor: { textDecoration: "none" },
            button: { transition: "0.2s" },
          },
        }}
        view={view}
        localization={{
          variables: {
            sign_in: {
              button_label: "Login",
              loading_button_label: "Logging in ...",
            },
          },
        }}
        redirectTo={redirectUrl}
      />
    </div>
  );
}
