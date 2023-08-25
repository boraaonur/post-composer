import { create } from "zustand";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { initialTemplates } from "../constants/defaults";

interface GPTTemplate {
  systemPrompt: string;
  label: string;
}

type TemplateState = {
  templates: GPTTemplate[];
  refreshTemplates: () => Promise<void>;
  addTemplate: (label: string, systemPrompt: string) => Promise<void>;
  editTemplate: (
    index: number,
    label: string,
    systemPrompt: string
  ) => Promise<void>;
  removeTemplate: (index: number) => Promise<void>;
};

export const useTemplateStore = create<TemplateState>((set, get, store) => {
  return {
    templates: [],
    refreshTemplates: async () => {
      const templates = await ChromeStorageUtils.get({
        storageKey: "TEMPLATES",
      });
      set({ templates });
    },
    addTemplate: async (label, systemPrompt) => {
      await ChromeStorageUtils.array.add({
        storageKey: "TEMPLATES",
        data: { label, systemPrompt },
      });

      get().refreshTemplates();
    },
    editTemplate: async (index, label, systemPrompt) => {
      await ChromeStorageUtils.array.set({
        storageKey: "TEMPLATES",
        data: { label, systemPrompt },
        index: index,
      });

      get().refreshTemplates();
    },
    removeTemplate: async (index) => {
      await ChromeStorageUtils.array.remove({ storageKey: "TEMPLATES", index });
      get().refreshTemplates();
    },
  };
});

// Load initial data
(() => {
  ChromeStorageUtils.get({ storageKey: "TEMPLATES" }).then((result) => {
    // Defaults
    if (!result) {
      ChromeStorageUtils.set({
        storageKey: "TEMPLATES",
        data: [...initialTemplates],
      });
    }

    // Refresh
    useTemplateStore.getState().refreshTemplates();
  });
})();
