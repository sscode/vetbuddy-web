// Templates Page
'use client'

import { H1, H2 } from "../Components/Typography";

import TemplateInput from "./TemplateInput";
import TemplateTable from "./TemplateTable";
import { useTemplateStore } from "../store";

export default function Templates() {
    const sections = useTemplateStore(state => state.sections);
    const updateSection = useTemplateStore(state => state.updateSection);
  
    const handleSectionChange = (index: number, newText: string) => {
      updateSection(index, newText);
    };
    
    const addSection = useTemplateStore(state => state.addSection);
    // Inside Templates component
    const sectionHandler = () => {
        // Ensure the new section starts with its index prefix
        addSection(`New Section`);
    };

    const deleteSection = useTemplateStore(state => state.deleteSection);
    const deleteHandler = (index: number) => {
        deleteSection(index);
    }

    const restoreDefault = useTemplateStore(state => state.restoreDefault);
    const restoreHandler = () => {
        restoreDefault();
    }




  return (
    <>
      <H2 className="my-4">Consult Templates</H2>
      <TemplateTable />
      <div className="mt-12">
        <h1
        className="text-black text-3xl font-bold"
        >Templates</h1>
        {sections.map((text, index) => (
          <div key={index}>
            <TemplateInput 
            onDelete={deleteHandler}
            index={index} text={text} onChange={handleSectionChange} />
          </div>
        ))}
        <div className="mt-12 flex align-middle justify-between">
            <div className="">
                <button
                onClick={sectionHandler}
                className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                >Add New Section</button>
            </div>
            <div className="">
                <button
                onClick={restoreHandler}
                className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
                >Restore Default</button>
            </div>

        </div>

      </div>
    </>
  );
}
