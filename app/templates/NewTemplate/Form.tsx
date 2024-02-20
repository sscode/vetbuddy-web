import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/Components/ui/button";
import { Input } from "@/app/Components/ui/input";
import { Checkbox } from "@/app/Components/ui/checkbox";
import { z } from "zod";
import { useToast } from "@/app/Components/ui/use-toast";
import { useTemplatesListStore } from "@/app/store";

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
  const { addTemplate } = useTemplatesListStore();
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

  const onSubmit = (values: any) => {
    // Remove async if not doing async operations or await inside
    const { name, sections } = values;

    console.log({ name, sections });

    addTemplate({
      name,
      modified: new Date().toISOString(),
      sections,
    });

    toast({ title: "Successfully added new Template" });
    reset(); // Resets the form to initial values
  };

  // Function to handle toggle change
  const handleToggleChange = (index: number, isChecked: boolean) => {
    console.log(`Toggle ${index}: ${isChecked}`);
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
          <Button type="button" onClick={() => remove(index)}>
            Remove
          </Button>
        </div>
      ))}

      <Button
        className="mr-2"
        type="button"
        onClick={() => append({ name: "", isChecked: false })}
      >
        Add Section
      </Button>
      <Button type="submit">Save Template</Button>
    </form>
  );
}
