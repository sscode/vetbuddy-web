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
import { Input } from "@/app/Components/ui/input";
import { LoaderIcon } from "lucide-react";
import { supabase } from "@/app/Lib/supabase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  email: z.string().min(1, "Please enter your email."),
  password: z.string().min(1, "Please enter your password."),
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { toast } = useToast(); // Destructuring to get toast function
  const { refresh } = useRouter();

  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        throw error;
      }
      form.reset();
      refresh();
    } catch (error) {
      toast({ title: "An unexpected error has occured, please try again" });
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
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
            Login
          </Button>
        </div>
      </form>
    </Form>
  );
}
