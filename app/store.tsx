import { create } from "zustand";
import { promptSections } from "./data/defaultPrompt";
import { persist } from 'zustand/middleware'

type TemplateStore = {
    sections: Array<string>;
    addSection: (section: string) => void;
    updateSection: (index: number, newSection: string) => void;
}

export const useTemplateStore = create<TemplateStore>(
    persist(
      (set) => ({
        sections: promptSections,
        addSection: (section) => set((state) => ({ sections: [...state.sections, section] })),
        updateSection: (index, newSection) =>
          set((state) => ({
            sections: state.sections.map((section, i) => (i === index ? newSection : section)),
          })),
      }),
      {
        name: 'template-store', // unique name of the store
      }
    )
  );
  