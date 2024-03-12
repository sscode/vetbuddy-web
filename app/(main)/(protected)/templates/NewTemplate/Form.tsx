import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@/app/Components/ui/button";
import { Checkbox } from "@/app/Components/ui/checkbox";
import { Input } from "@/app/Components/ui/input";
import { errorMessages } from "@/app/Constants/messages";
import { useTemplateListStore } from "@/app/store";
import { useToast } from "@/app/Components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "Please enter a Template Name."),
  sections: z.array(
    z.object({
      name: z.string().min(1, "Please enter a section."),
      isChecked: z.boolean(),
    })
  ), // Assuming sections are required
});

export default function NewTemplateForm() {
  const { addTemplate, loading } = useTemplateListStore();
  const { toast } = useToast(); // Destructuring to get toast function

  const { register, control, handleSubmit, setValue, reset } = useForm({
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sections",
  });

  const onSubmit = async (values: any) => {
    // Remove async if not doing async operations or await inside
    const { name, sections } = values;
    try {
      await addTemplate({
        name,
        sections,
      });
      toast({ title: "Successfully added new Template" });
      reset(); // Resets the form to initial values
    } catch (error) {
      toast({ title: errorMessages.unexpected, variant: "destructive" });
      console.error("Failed to add template:", error);
    }
  };

  // Function to handle toggle change
  const handleToggleChange = (index: number, isChecked: boolean) => {
    setValue(`sections.${index}.isChecked`, isChecked);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input {...register("name")} placeholder="Template Name" />
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center space-x-2">
          <Input
            {...register(`sections.${index}.name`)}
            placeholder={`Section ${index + 1}`}
          />
          <Checkbox
            id={`sections.${index}.isChecked`}
            {...register(`sections.${index}.isChecked`)}
            onCheckedChange={(val: any) => handleToggleChange(index, val)}
          />
          <Button
            type="button"
            onClick={() => remove(index)}
            disabled={loading}
          >
            Remove
          </Button>
        </div>
      ))}

      <div className="flex flex-row gap-2 items-center">
        <Button
          className="mr-2"
          type="button"
          onClick={() => append({ name: "", isChecked: false })}
          disabled={loading}
        >
          Add Section
        </Button>
        <Button type="submit" loading={loading}>
          Save Template
        </Button>
      </div>
    </form>
  );
}
