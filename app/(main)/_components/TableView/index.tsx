import { Button } from "@/app/Components/ui/button";
import { FilePlusFilled } from "@/app/Components/Icons";
import { H2 } from "@/app/Components/Typography";
import HintText from "./HintText";
import NewTemplateModal from "@/app/Components/NewTemplateModal";
import React from "react";
import SearchTemplate from "./SearchTemplate";
import { Template } from "@/app/store";
import TemplateTable from "../TemplateTable";

type Props = {
  templates: Template[];
};

export default function HomeTableView({ templates }: Props) {
  return (
    <div className="space-y-6">
      <H2>Templates for Consult</H2>

      <div className="space-y-2">
        <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
          <SearchTemplate />
          <NewTemplateModal>
            <Button
              className="w-full md:w-fit px-4 flex gap-2 items-center"
              variant="primary"
              size="lg"
            >
              <FilePlusFilled />
              New Template
            </Button>
          </NewTemplateModal>
        </div>
        <HintText />
      </div>

      <TemplateTable templates={templates || []} />
    </div>
  );
}
