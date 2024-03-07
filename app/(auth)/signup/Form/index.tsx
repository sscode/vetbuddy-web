"use client";

import * as React from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/Components/ui/form";

import { Button } from "@/app/Components/ui/button";
import { Card } from "@/app/Components/ui/card";
import { Input } from "@/app/Components/ui/input";
import { LoaderIcon } from "lucide-react";
import { P } from "@/app/Components/Typography";
import { supabase } from "@/app/Lib/supabase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Please enter an email address."),
  password: z.string().min(1, "Please enter a password."),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignUpForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(false);
  const [emailSent, setEmailSent] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSignUp = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      form.reset();
      setEmailSent(true);
    } catch (error) {
      toast({ title: "An unexpected error has occured, please try again" });
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  if(emailSent){
    return (
      <Card className="w-full px-4 py-2">
        <P className="text-sm">Confirmation e-mail has been sent to your e-mail address. Please Check your email.</P>
      </Card>
    )
  }

  return (
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
          <Button disabled={isLoading}>
            {isLoading && <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />}
            Sign up
          </Button>
        </div>
      </form>
    </Form>
  );
}
