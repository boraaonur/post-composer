import {
  VStack,
  Text,
  Input,
  Button,
  HStack,
  IconButton,
  Box,
} from "@chakra-ui/react";

import { useState } from "react";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { HiRefresh, HiPlus, HiArrowLeft } from "react-icons/hi";
import { Textarea } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useTemplateStore } from "../stores/useTemplateStore";
import Layout from "../layout";
function AddTemplatePage() {
  const [systemPrompt, setSystemPrompt] = useState("");
  const [label, setLabel] = useState("");

  const { addTemplate } = useTemplateStore();

  const navigate = useNavigate();

  return (
    <Layout
      includeFooter={false}
      header={
        <HStack width="full" justify="space-between">
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<HiArrowLeft />}
            onClick={() => {
              navigate("/");
            }}
          />
          <Text fontWeight="bold" fontSize={20}>
            Add Template
          </Text>
          <IconButton
            colorScheme="white"
            aria-label="Search database"
            icon={<HiArrowLeft />}
            onClick={() => {
              navigate("/");
            }}
          />
        </HStack>
      }
    >
      <VStack w="full" height="full" justifyContent="space-between" pt="8px">
        <VStack w="full">
          <Input
            value={label}
            placeholder="Label / Identifier"
            onChange={(event) => {
              setLabel(event.target.value);
            }}
          />
          <Textarea
            value={systemPrompt}
            onChange={(event) => {
              setSystemPrompt(event.target.value);
            }}
            placeholder="Enter system prompt here"
            size="sm"
          />
        </VStack>
        <Button
          w="full"
          colorScheme="blue"
          onClick={async () => {
            await addTemplate(label, systemPrompt);

            navigate("/");
          }}
        >
          Confirm
        </Button>
      </VStack>
    </Layout>
  );
}

export default AddTemplatePage;
