import create from "zustand";
import { GPTTemplate } from "../types";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { langs } from "../constants/langs";

import { initialTemplates } from "../../../popup/src/constants/defaults";

const DEFAULT_LANGUAGE = "en";

type ConfigState = {
  templates: GPTTemplate[];
  currentTemplate?: GPTTemplate;
  selectTemplate: (template: GPTTemplate) => void;
  currentLanguage: string;
  selectLanguage: (language: string) => void;
};

const useConfigStore = create<ConfigState>((set) => ({
  templates: [],
  currentTemplate: undefined,

  selectTemplate: (template: GPTTemplate) => {
    set({ currentTemplate: template });

    if (template) {
      ChromeStorageUtils.set({
        storageKey: "LAST_SELECTED_TEMPLATE",
        data: template,
      });
    }
  },
  currentLanguage: "en",
  selectLanguage: (language: string) => {
    ChromeStorageUtils.set({
      storageKey: "LAST_SELECTED_LANGUAGE",
      data: language,
    });

    set({ currentLanguage: language });
  },
}));

export default useConfigStore;

// Helper function to load initial data
const loadInitialData = async () => {
  const result = await chrome.storage.local.get([
    "TEMPLATES",
    "LAST_SELECTED_TEMPLATE",
    "LAST_SELECTED_LANGUAGE",
    "GPT_MODEL",
  ]);

  if (!result.TEMPLATES) {
    ChromeStorageUtils.set({
      storageKey: "TEMPLATES",
      data: initialTemplates,
    });
    useConfigStore.setState({ templates: initialTemplates });
  }

  if (!result.LAST_SELECTED_TEMPLATE) {
    useConfigStore.setState({
      currentTemplate: result.TEMPLATES
        ? result.TEMPLATES[0]
        : initialTemplates[0],
    });
  } else {
    useConfigStore.setState({
      currentTemplate: result.LAST_SELECTED_TEMPLATE,
    });
  }

  if (!result.GPT_MODEL) {
    ChromeStorageUtils.set({
      storageKey: "GPT_MODEL",
      data: "gpt-3.5-turbo",
    });
  }

  useConfigStore.setState({
    currentLanguage: result.LAST_SELECTED_LANGUAGE || DEFAULT_LANGUAGE,
  });
};

loadInitialData();
