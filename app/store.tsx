import { MOCK_TEMPLATES } from "./Constants/mockData";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { promptSections } from "./data/defaultPrompt";

type TemplateStore = {
  sections: Array<string>;
  addSection: (section: string) => void;
  updateSection: (index: number, newSection: string) => void;
  deleteSection: (index: number) => void;
  restoreDefault: () => void;
};

export const useTemplateStore = create<TemplateStore>()(
  persist(
    (set) => ({
      sections: promptSections,
      addSection: (section: string) =>
        set((state: TemplateStore) => ({
          sections: [...state.sections, section],
        })),
      updateSection: (index: number, newSection: string) =>
        set((state: TemplateStore) => ({
          sections: state.sections.map((section: string, i: number) =>
            i === index ? newSection : section
          ),
        })),
      deleteSection: (index: number) =>
        set((state: TemplateStore) => ({
          sections: state.sections.filter(
            (section: string, i: number) => i !== index
          ),
        })),
      restoreDefault: () => set({ sections: promptSections }),
    }),
    {
      name: "template-store",
    }
  )
);

type Section = {
  name: string;
  isChecked: boolean
}

export type Template = {
  name: string;
  modified: string;
  sections: Section[];
};

type TemplateListStore = {
  templates: Array<Template>;
  addTemplate: (newTemplate: Template) => void;
  deleteTemplate: (index: number) => void;
};

export const useTemplatesListStore = create<TemplateListStore>()(
  persist(
    (set) => ({
      templates: MOCK_TEMPLATES,
      addTemplate: (newTemplate) => set((state) => ({
        templates: [...state.templates, newTemplate],
      })),
      deleteTemplate: (index) => set((state) => ({
        templates: state.templates.filter((_, i) => i !== index),
      })),
    }),
    {
      name: "templates-list-store",
    }
  )
);
