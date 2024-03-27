"use client"

import { File, Mic } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem } from '@/app/Components/ui/form';
import React, { useMemo } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/app/Components/ui/select";

import Image from 'next/image';
import { Input } from '@/app/Components/ui/input';
import { P } from '@/app/Components/Typography';
import RecordButton from './RecordButton';
import { Template } from '@/app/store';
import { cn } from '@/app/Lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  templates?: Template[]
}

export default function ConsultForm({ templates }: Props) {
  const formSchema = z.object({
    template_id: z.string(),
    name: z.string().min(1, "Please enter your/patient's name."),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      template_id: "",
      name: "",
    },
  });

  const template_id = form.getValues("template_id")

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log("Values", values);
        })}
        className="flex flex-col"
      >
        <FormField
          control={form.control}
          name="template_id"
          render={({ field }) => (
            <FormItem className="w-full mb-6">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="h-12 border rounded-md px-2 w-full drop-shadow-sm flex items-center gap-2">
                    <File className={cn(template_id ? "text-primary-blue" : "text-neutral-400", "h-5")} />
                    <div className="flex-grow text-start">
                      <SelectValue className="flex-grow" placeholder="Choose a template" />
                    </div>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {
                      templates?.length && templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormDescription className='mt-2'>
                This information is required
              </FormDescription>
            </FormItem>
          )}
        />

        {template_id ?
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full mb-0">
                <div className='flex w-full h-12 items-center border rounded-md group-[nameinput]:'>
                  <div className='bg-gray-50 text-neutral-600 h-full px-4 w-32 flex items-center border-r'>
                    Name
                  </div>
                  <input placeholder='Enter details here' className='flex-grow border-0 rounded-none focus-visible:outline-none px-3 py-2 text-sm' {...field} />
                </div>
                <FormDescription className='mt-2'>
                  This information is required
                </FormDescription>
              </FormItem>
            )}
          /> : <Image
            alt="consult-graphic"
            width={240}
            height={0}
            src="/consult.svg"
            className="mx-auto my-8"
          />}

        <div className='fixed left-0 bottom-0 w-full h-24 bg-slate-50'>
          <div className='absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2'>
            <RecordButton />
            <P className='text-center'>Choose a template to record consult</P>
          </div>
        </div>
      </form>
    </Form>
  )
}