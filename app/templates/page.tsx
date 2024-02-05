// Templates Page
'use client'

import Nav from "../Components/Nav/Nav";
import { useTemplateStore } from "../store";
import TemplateInput from "./TemplateInput";

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


  return (
    <main className="bg-white p-24">
        <Nav />
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
        <div className="mt-12">
            <button
            onClick={sectionHandler}
            className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >Add New Section</button>
        </div>
        <div className="mt-4">
            {/* <button
            className="text-black border border-black p-2 rounded-md hover:bg-black hover:text-white transition-all duration-300 ease-in-out"
            >Save Template</button> */}
        </div>
      </div>
    </main>
  );
}
