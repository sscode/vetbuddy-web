"use client";

import { Button } from "@/app/Components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/Components/ui/dialog";
import { Input } from "@/app/Components/ui/input";
import { Label } from "@/app/Components/ui/label";
import { P, Span } from "../Typography";
import { useFieldArray, useForm } from "react-hook-form";
import { useToast } from "../ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTemplateListStore } from "@/app/store";
import { errorMessages } from "@/app/Constants/messages";
import { Checkbox } from "../ui/checkbox";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { FilePlusFilled } from "../Icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { addTemplate } from "@/app/Actions/templates";

type Props = {
  children: React.ReactNode;
};

const formSchema = z.object({
  name: z.string().min(1, "Please enter a Template Name."),
  sections: z.array(
    z.object({
      name: z.string().min(1, "Please enter a section."),
      isChecked: z.boolean(),
    })
  ), // Assuming sections are required
});

export default function NewTemplateModal({ children }: Props) {
  const { toast } = useToast(); // Destructuring to get toast function

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      sections: [
        {
          name: "",
          isChecked: false,
        },
      ], // Start with one section
    },
  });
  const { register, control, handleSubmit, setValue, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: any) => {
    // Remove async if not doing async operations or await inside
    const { name, sections } = values;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("sections", JSON.stringify(sections));
    try {
      setLoading(true)
      await addTemplate(formData);
      toast({ title: "Successfully added new Template" });
      reset(); // Resets the form to initial values
    } catch (error) {
      toast({ title: errorMessages.unexpected, variant: "destructive" });
      console.error("Failed to add template:", error);
    } finally {
      setLoading(false)
    }
  };

  // Function to handle toggle change
  const handleToggleChange = (index: number, isChecked: boolean) => {
    setValue(`sections.${index}.isChecked`, isChecked);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader className="flex-row items-center gap-2">
          <div className="bg-primary-blue p-2 w-fit rounded-full">
            <FilePlusFilled />
          </div>
          <DialogTitle className="text-2xl font-medium">
            Create Template
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div>
                        <Input {...field} placeholder="Enter template name" />
                        <P className="text-gray-400 text-xs font-light">
                          For Example Mammals, Dogs, etc
                        </P>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {fields.map((field, index) => (
              <React.Fragment key={field.id}>
                <FormField
                  control={form.control}
                  name={`sections.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Add information, for example: Age"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-2 items-center mt-4 mb-6 justify-between">
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id={`sections.${index}.isChecked`}
                      {...register(`sections.${index}.isChecked`)}
                      onCheckedChange={(val: any) =>
                        handleToggleChange(index, val)
                      }
                    />
                    <Label
                      htmlFor={`sections.${index}.isChecked`}
                      className="text-xs font-light"
                    >
                      Mark above field mandatory?
                    </Label>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-500"
                      onClick={() => remove(index)}
                      disabled={loading}
                    >
                      <X />
                    </Button>
                  )}
                </div>
              </React.Fragment>
            ))}
            <Button
              className="w-full space-x-2 mb-6"
              variant="dotted-primary"
              onClick={() => append({ name: "", isChecked: false })}
            >
              <Plus /> <Span>Add another field</Span>
            </Button>

            <DialogFooter className="w-full">
              <Button
                className="flex-grow max-w-[50%]"
                size="lg"
                variant="outline"
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                className="flex-grow max-w-[50%]"
                size="lg"
                variant="primary"
                type="submit"
                loading={loading}
              >
                Save Template
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
