import { create } from "zustand";
import { createClient } from "./Lib/supabase/client";
import { persist } from "zustand/middleware";

type Section = {
  name: string;
  isChecked: boolean;
};

export type TemplateInput = {
  name: string;
  sections: Section[];
};

export type Template = {
  id: string;
  updated_at: Date;
} & TemplateInput;

type TemplateListStore = {
  templates: Array<Template>;
  loading: boolean;
  fetchLatestTemplates: () => Promise<void>;
  addTemplate: (newTemplate: TemplateInput) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
};

export const useTemplateListStore = create<TemplateListStore>()(
  persist(
    (set, get) => ({
      templates: [],
      loading: false,
      fetchLatestTemplates: async () => {
        const supabase = createClient();
        try {
          const { data, error } = await supabase
            .from("templates")
            .select("id, name, updated_at, sections");
          if (error) {
            throw error;
          }
          set({ templates: data || [] });
        } catch (error) {
          console.error(error);
        }
      },
      addTemplate: (newTemplate) =>
        new Promise(async (resolve, reject) => {
          const supabase = createClient();
          set({ loading: true });
          try {
            const { data, error } = await supabase
              .from("templates")
              .insert({
                name: newTemplate?.name,
                sections: newTemplate?.sections,
              })
              .select("id, name, updated_at, sections")
              .single();
            if (error) {
              throw error;
            }
            set((state) => ({
              templates: [
                ...state.templates,
                {
                  ...data,
                },
              ],
              loading: false,
            }));
            resolve();
          } catch (error) {
            console.error(error);
            set({ loading: false });
            reject(error);
          }
        }),
      deleteTemplate: (id) =>
        new Promise(async (resolve, reject) => {
          const supabase = createClient();
          const prevState = get().templates;
          set((state) => ({
            templates: state.templates.filter((template) => template.id !== id),
          }));
          try {
            const { error } = await supabase
              .from("templates")
              .delete()
              .eq("id", id);
            if (error) {
              throw error;
            }
            resolve();
          } catch (error) {
            console.error(error);
            set({ templates: prevState });
            reject(error);
          }
        }),
    }),
    {
      name: "template-list-store",
    }
  )
);
