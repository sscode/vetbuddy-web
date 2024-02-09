import { Card } from "@/app/Components/ui/card";
import { H2 } from "@/app/Components/Typography";
import NewTemplateForm from "./Form";
import React from "react";

type Props = {};

export default function NewTemplate({}: Props) {
  return (
    <Card className="bg-slate-50 p-8 pb-16 rounded-none">
      <H2 className="mb-8">Create a Template</H2>

      <NewTemplateForm />
    </Card>
  );
}
