import { create } from "zustand";
import { promptSections } from "./data/defaultPrompt";
import { persist } from 'zustand/middleware'

type TemplateStore = {
    sections: Array<string>;
    addSection: (section: string) => void;
    updateSection: (index: number, newSection: string) => void;
    deleteSection: (index: number) => void;
}

export const useTemplateStore = create<TemplateStore>()(
    persist(
        (set) => ({
            sections: [],
            addSection: (section: string) => set((state: TemplateStore) => ({ sections: [...state.sections, section] })),
            updateSection: (index: number, newSection: string) => set((state: TemplateStore) => ({
                sections: state.sections.map((section: string, i: number) => i === index ? newSection : section),
            })),
            deleteSection: (index: number) => set((state: TemplateStore) => ({
                sections: state.sections.filter((section: string, i: number) => i !== index),
            })),
        }),
        {
            name: 'template-store',
        }
    )
)