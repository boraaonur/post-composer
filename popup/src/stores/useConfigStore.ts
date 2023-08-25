import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { create } from "zustand";
import { GPTModel } from "../types";

type ConfigState = {
  apiKey: string;
  gptModel: GPTModel;
  saveApiKey: (apiKey: string) => Promise<void>;
  updateGptModel: (gptModel: GPTModel) => Promise<void>;
};

export const useConfigStore = create<ConfigState>((set) => ({
  apiKey: "",
  gptModel: "gpt-3.5-turbo",

  // You may want to update these functions to persist the data somewhere.
  saveApiKey: async (apiKey: string) => {
    ChromeStorageUtils.set({
      storageKey: "API_KEY",
      data: apiKey,
    });

    set({ apiKey });
  },

  updateGptModel: async (gptModel) => {
    ChromeStorageUtils.set({
      storageKey: "GPT_MODEL",
      data: gptModel,
    });

    set({ gptModel });
  },
}));

// Load initial data API_KEY
(() => {
  ChromeStorageUtils.get({ storageKey: "API_KEY" }).then((apiKey) => {
    useConfigStore.setState({ apiKey: apiKey ?? "" });
  });
})();

// Load initial data for GPT_MODEL
(() => {
  ChromeStorageUtils.get({ storageKey: "GPT_MODEL" }).then((gptModel) => {
    useConfigStore.setState({ gptModel: gptModel ?? "gpt-3.5-turbo" });
  });
})();
