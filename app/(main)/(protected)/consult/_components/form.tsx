"use client";

import { Avatar, AvatarFallback } from "@/app/Components/ui/avatar";
import { File, Files } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from "@/app/Components/ui/form";
import { H2, H4, P, Span } from "@/app/Components/Typography";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/Components/ui/select";
import { cn, copyToClipboard } from "@/app/Lib/utils";

import AudioPlayer from "./AudioPlayer";
import { Button } from "@/app/Components/ui/button";
import { FourPointedStar } from "@/app/Components/Icons/FourPointedStar";
import Image from "next/image";
import RecordButton from "./RecordButton";
import { Template } from "@/app/store";
import { createConsult } from "@/app/Actions/consult";
import { useForm } from "react-hook-form";
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
    } catch (error) {
      toast({
        title: "Error in Transcription. Try recording again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const Result = () => (
    <>
      <div>
        <div className="flex items-center gap-2 w-fit mb-2">
          <Avatar>
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <Span className="text-gray-600">You shared a recording</Span>
        </div>
        <AudioPlayer src={audioURL} />
        {!isLoading && consultText && (
          <div className="flex flex-col flex-grow gap-2 my-4">
            <div className="flex items-center justify-between">
              <H4>Suggestion</H4>
              <Button
                onClick={() => copyToClipboard(consultText)}
                size="sm"
                variant="outline"
                className="text-gray-500"
              >
                <Files className="h-4" /> Copy
              </Button>
            </div>
            <textarea
              disabled
              className={cn(
                "w-full p-2 border rounded-md text-sm flex-grow h-[240px] resize-none",
                "disabled:text-black disabled:cursor-text disabled:bg-background"
              )}
              defaultValue={consultText}
            />
          </div>
        )}
      </div>
      {isLoading && (
        <div className="flex-grow flex flex-col justify-center items-center">
          <div className="flex items-center justify-center relative size-[82px]">
            <Image
              alt="Loading"
              src="/custom-loading.png"
              width={60}
              height={60}
              className="animate-spin"
            />
            <Image
              alt="Loading"
              src="/custom-loading-large.png"
              width={82}
              height={82}
              className="absolute animate-reverse-spin top-0 left-0 size-[82px]"
            />
            <FourPointedStar className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <Span className="text-base font-medium text-neutral-500">
            Consult is being Generated
          </Span>
        </div>
      )}
    </>
  );

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
                    <div className="bg-gray-50 text-neutral-600 h-full px-4 w-1/4 min-w-fit flex items-center border-r">
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
              <RecordButton
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
      {/* <Drawer>
        <DrawerTrigger className="flex md:hidden w-full gap-2 p-4 justify-center bg-light-blue text-primary-blue border-t">
          <ChevronUp /> <span>Show Generations</span>
        </DrawerTrigger>
        <DrawerContent>
          <Result />
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
      {audioURL && (
        <>
          <div className="flex flex-col flex-grow min-h-full bg-white md:px-8 px-4 pt-12">
            <Result />
          </div>
        </>
      )}
    </div>
  );
}
