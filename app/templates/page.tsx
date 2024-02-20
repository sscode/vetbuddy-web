// Templates Page
"use client";

import NewTemplate from "./NewTemplate";
import TemplateTable from "./TemplateTable";

export default function Templates() {

  return (
    <div className="space-y-12">
      <TemplateTable />
      <NewTemplate />
    </div>
  );
}
