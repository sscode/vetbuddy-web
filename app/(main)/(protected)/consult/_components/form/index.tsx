"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/app/Components/ui/form";
import { H2, P } from "@/app/Components/Typography";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/ui/select";

import ConsultResult from "../ConsultResult";
import { File } from "lucide-react";
import Image from "next/image";
import Recorder from "@/app/Components/Recorder";
import { Template } from "@/app/store";
import { cn } from "@/app/Lib/utils";
import { createConsult } from "@/app/Actions/consult";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  templates?: Template[];
};

export default function ConsultForm({ templates }: Props) {
  const formSchema = z.object({
    template_id: z.string(),
    name: z.string().min(1, "Please enter your/patient's name."),
    audioBlob: z.any().nullable(),
  });

  const defaultValues: z.infer<typeof formSchema> = {
    template_id: "",
    name: "",
    audioBlob: null,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { toast } = useToast();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [consultText, setConsultText] = useState<string>("");

  const template_id = form.getValues("template_id");
  const name = form.getValues("name");
  const audioBlob = form.watch().audioBlob;

  const audioURL = audioBlob && URL.createObjectURL(audioBlob);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { name, template_id, audioBlob } = form.getValues();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("template_id", template_id);
      formData.append("audioBlob", audioBlob);
      formData.append("templates", JSON.stringify(templates));
      formData.append("consultText", consultText);

      const newConsult = await createConsult(formData);
      setConsultText(newConsult.content);
      toast({ title: "Successfully Added Consultation" });
      router.push(`/consult/${newConsult.id}`);
    } catch (error) {
      toast({
        title: "Error in Transcription. Try recording again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex gap-4 md:gap-0 flex-col md:flex-row flex-grow">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            console.log("Values", values);
          })}
          className={cn(
            audioBlob ? "md:max-w-md" : "max-w-4xl mx-auto",
            "w-full md:w-auto px-4 md:px-8 flex flex-col flex-grow relative pt-12"
          )}
        >
          <H2 className="mb-6">Consult</H2>
          <FormField
            control={form.control}
            name="template_id"
            render={({ field }) => (
              <FormItem className="w-full mb-6">
                <Select
                  name={field.name}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border rounded-md px-2 w-full drop-shadow-sm flex items-center gap-2">
                      <File
                        className={cn(
                          template_id
                            ? "text-primary-blue"
                            : "text-neutral-400",
                          "h-5"
                        )}
                      />
                      <div className="flex-grow text-start">
                        <SelectValue
                          className="flex-grow"
                          placeholder="Choose a template"
                        />
                      </div>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {templates?.length &&
                        templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormDescription className="mt-2">
                  This information is required
                </FormDescription>
              </FormItem>
            )}
          />

          {template_id ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full mb-0">
                  <div className="flex w-full h-12 items-center border rounded-md overflow-hidden group-[nameinput]:">
                    <div className="bg-gray-50 text-sm text-neutral-600 h-full px-4 w-1/4 min-w-fit flex items-center border-r">
                      Name
                    </div>
                    <input
                      placeholder="Enter details here"
                      className="flex-grow border-0 rounded-none h-full focus-visible:outline-none px-3 py-2 text-sm"
                      {...field}
                    />
                  </div>
                  <FormDescription className="mt-2">
                    This information is required
                  </FormDescription>
                </FormItem>
              )}
            />
          ) : (
            <div className="h-0">
              <Image
                alt="consult-graphic"
                width={240}
                height={0}
                priority
                src="/consult.svg"
                className="mx-auto h-auto my-8"
              />
            </div>
          )}
          <div className="w-full h-24 mt-16"></div>
          <div className="absolute left-0 bottom-0 w-full h-24 bg-slate-50">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
              <Recorder
                onRecord={() => {}}
                onStop={async (audioBlobs) => {
                  const audioBlob = new Blob(audioBlobs, { type: "audio/wav" });
                  form.setValue("audioBlob", audioBlob);
                  await handleSubmit();
                }}
                disabled={!(template_id && name)}
              />
              <P className="text-center">Choose a template to record consult</P>
            </div>
          </div>
        </form>
      </Form>
      {audioURL && (
        <>
          <div className="flex flex-col flex-grow min-h-full bg-white md:px-8 px-4 pt-12">
            <ConsultResult
              audioURL={audioURL}
              consultText={consultText}
              isLoading={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}
