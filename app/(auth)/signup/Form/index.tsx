"use client";

import * as React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/Components/ui/form";
import { cn, makeFormData } from "@/app/Lib/utils";

import { Button } from "@/app/Components/ui/button";
import { Card } from "@/app/Components/ui/card";
import { Input } from "@/app/Components/ui/input";
import { P } from "@/app/Components/Typography";
import { errorMessages } from "@/app/Constants/messages";
import { signUp } from "@/app/Actions/signUp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Please enter an email address."),
  password: z.string().min(1, "Please enter a password."),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [emailSent, setEmailSent] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setMessage("");
    const formData = makeFormData(values)
    try {
      await signUp(formData)
      form.reset();
      setMessage(
        "Confirmation e-mail has been sent to your e-mail address. Please Check your email."
      );
      setEmailSent(true);
    } catch (error) {
      if (error instanceof Error) {
        error?.message
          ? setMessage(error.message)
          : setMessage(errorMessages.unexpected);
      }
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {message && (
        <Card className="w-full px-4 py-2">
          <P
            className={cn(
              "text-sm text-center",
              !emailSent ? "text-red-500" : "text-green-500"
            )}
          >
            {message}
          </P>
        </Card>
      )}
      {!emailSent && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)}>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow max-w-[900px]">
                    <FormControl>
                      <Input
                        placeholder="name@example.com"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-grow max-w-[900px]">
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
              className="bg-primary-blue text-white"
              type="submit" loading={isLoading}>
                Sign up
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
