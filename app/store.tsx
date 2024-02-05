import { create } from "zustand";
import { promptSections } from "./data/defaultPrompt";


type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

type TemplateStore = {
    sections: Array<string>;
    addSection: (section: string) => void;
    updateSection: (index: number, newSection: string) => void;
}


export const useTemplateStore = create<TemplateStore>((set) => ({
    sections: promptSections, // Initial sections
    addSection: (section) => set((state) => ({ sections: [...state.sections, section] })),
    updateSection: (index: number, newSection: string) => set((state) => {
      const updatedSections = state.sections.map((section, i) => {
        if (i === index) {
          return newSection;
        }
        return section;
      });
      return { sections: updatedSections };
    }),
  }));
  