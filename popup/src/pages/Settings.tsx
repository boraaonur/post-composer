import {
  VStack,
  Text,
  Input,
  Button,
  HStack,
  IconButton,
  Box,
  Center,
  Divider,
  Select,
} from "@chakra-ui/react";

import { useState } from "react";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { HiRefresh, HiPlus, HiArrowLeft } from "react-icons/hi";
import { Textarea } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import Layout from "../layout";
import { useConfigStore } from "../stores/useConfigStore";
import { GPTModel, GPT_MODEL_OPTIONS } from "../types";

function Settings() {
  const { updateGptModel, saveApiKey, apiKey, gptModel } = useConfigStore();

  const [apiKeyInput, setApiKeyInput] = useState(apiKey);

  const navigate = useNavigate();

  return (
    <Layout
      header={
        <Center width="full">
          <Text fontWeight="bold" fontSize={20}>
            Settings
          </Text>
        </Center>
      }
    >
      <VStack w="full">
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>
            Note: Your information, including the API_KEY, is stored only in
            your browser. This app operates locally and does not make any
            network requests to external servers.
          </p>
        </div>
        <Text>OPENAI API KEY</Text>
        <Input
          value={apiKeyInput}
          placeholder="sk-***"
          onChange={(event) => {
            setApiKeyInput(event.target.value);
          }}
        />
        <Button
          w="full"
          colorScheme="blue"
          onClick={async () => {
            saveApiKey(apiKeyInput);
          }}
        >
          Confirm
        </Button>
        <Divider />
        <Text>GPT MODEL</Text>
        <Select
          w="full"
          value={gptModel}
          onChange={(e) => {
            updateGptModel(e.target.value as GPTModel);
          }}
        >
          {GPT_MODEL_OPTIONS.map((model) => (
            <option value={model}>{model}</option>
          ))}
        </Select>
      </VStack>
    </Layout>
  );
}

export default Settings;
