import { H2, P } from "@/app/Components/Typography";

import Link from "next/link";
import { LoginForm } from "./Form";
import React from "react";
import { Separator } from "@/app/Components/ui/separator";

type Props = {};

export default async function LoginPage({}: Props) {
  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <H2 className="tracking-tight">Welcome back</H2>
        <P className="text-muted-foreground">Sign in to your account</P>
      </div>
      <LoginForm />
      <P className="text-sm text-center">
        Don't have an account?{" "}
        <Link className="link" href="/signup">
          Sign Up
        </Link>
      </P>
    </>
  );
}
