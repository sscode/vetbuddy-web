"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/Components/ui/form";

import { Button } from "@/app/Components/ui/button";
import { DeleteFilled } from "@/app/Components/Icons";
import { Input } from "@/app/Components/ui/input";
import { P } from "@/app/Components/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import { useTemplatesStore } from "@/app/store";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const formSchema = z.object({
  details: z
    .string({ required_error: "Please enter Details." })
    .min(1, { message: "Please enter Details." })
    .max(150),
  reason: z
    .string({ required_error: "Please enter a Reason." })
    .min(1, { message: "Please enter a Reason." })
    .max(150),
  history: z
    .string({ required_error: "Please enter History." })
    .min(1, { message: "Please enter History." })
    .max(150),
  physicalExamination: z
    .string({
      required_error: "Please enter information about Physical Examination.",
    })
    .min(1, { message: "Please enter information about Physical Examination." })
    .max(150),
  complaints: z
    .string({ required_error: "Please enter any Complaints." })
    .min(1, { message: "Please enter any Complaints." })
    .max(150),
});

export default function NewTemplateForm({}: Props) {
  const { toast } = useToast();
  const { addTemplate } = useTemplatesStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      complaints:"",
      details:"",
      history:"",
      physicalExamination:"",
      reason:"",
    },
    reValidateMode: "onBlur",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { complaints, details, history, physicalExamination, reason } =
      values;
    addTemplate({
      modified: new Date(),
      name: details,
      history,
      physicalExamination,
      reason,
      complaints,
    });
    toast({
      title: "Successfully added new Template",
    });
    form.reset();
  }

  const fields: {
    name:
      | "details"
      | "reason"
      | "history"
      | "physicalExamination"
      | "complaints";
    placeholder: string;
    onDelete?: () => void;
  }[] = [
    {
      name: "details",
      placeholder: "Details",
    },
    {
      name: "reason",
      placeholder: "Reason for Visit",
    },
    {
      name: "history",
      placeholder: "History",
    },
    {
      name: "physicalExamination",
      placeholder: "Physical Examination",
    },
    {
      name: "complaints",
      placeholder: "Complaints",
      onDelete: () => {
        form.resetField("complaints");
      },
    },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <P className="text-sm text-slate-500 dark:text-slate-400">
            Add section to your template
          </P>
          {fields.map((item) => (
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem className="flex-grow max-w-[900px]">
                    <FormControl>
                      <Input
                        className="placeholder:text-slate-500 font-medium"
                        placeholder={item.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {item.onDelete && (
                <Button type="button" onClick={item.onDelete} variant="ghost">
                  <DeleteFilled className="text-lg text-slate-700 dark:text-slate-400" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="rounded-lg w-[240px]"
        >
          Save Template
        </Button>
      </form>
    </Form>
  );
}
