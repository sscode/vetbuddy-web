import { H2, P } from "@/app/Components/Typography";

import Link from "next/link";
import React from "react";
import { SignUpForm } from "./Form";

type Props = {};

export default function SignUpPage({}: Props) {
  return (
    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <H2 className="tracking-tight">Get Started</H2>
          <P className="text-muted-foreground">
            Create a new account
          </P>
        </div>
        <SignUpForm />
        <P className="text-sm text-center">
          Have an account? <Link className="link" href="/login">Login</Link>
        </P>
        <P className="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link className="link" href="#">Terms of Service</Link> and{" "}
          <Link className="link" href="#">Privacy Policy</Link>.
        </P>
      </div>
    </div>
  );
}
