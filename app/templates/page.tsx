// Templates Page
"use client";

import NewTemplate from "./NewTemplate";
import TemplateTable from "./TemplateTable";

// import { useTemplateStore } from "../store";
// import TemplateInput from "./TemplateInput";

export default function Templates() {
  // const { sections, addSection, deleteSection, restoreDefault, updateSection } =
  //   useTemplateStore();

  // const handleSectionChange = (index: number, newText: string) => {
  //   updateSection(index, newText);
  // };
  // // Inside Templates component
  // const sectionHandler = () => {
  //   // Ensure the new section starts with its index prefix
  //   addSection(`New Section`);
  // };
  // const deleteHandler = (index: number) => {
  //   deleteSection(index);
  // };
  // const restoreHandler = () => {
  //   restoreDefault();
  // };

  return (
    <div className="space-y-12">
      <TemplateTable />
      <NewTemplate />

      {/* <div className="mt-12">
        <h1 className="text-black text-3xl font-bold">Templates</h1>
        {sections.map((text, index) => (
          <div key={index}>
            <TemplateInput
              onDelete={deleteHandler}
              index={index}
              text={text}
              onChange={handleSectionChange}
            />
          </div>
        ))}
        <div className="mt-12 flex align-middle justify-between">
          <div className="">
            <button
              onClick={sectionHandler}
              className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >
              Add New Section
            </button>
          </div>
          <div className="">
            <button
              onClick={restoreHandler}
              className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >
              Restore Default
            </button>
          </div>
        </div>
      </div> */}

    </div>
  );
}
