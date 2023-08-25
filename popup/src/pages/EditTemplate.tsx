import {
  VStack,
  Text,
  Input,
  Button,
  HStack,
  IconButton,
  Box,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { HiRefresh, HiPlus, HiArrowLeft } from "react-icons/hi";
import { Textarea } from "@chakra-ui/react";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { useLocation, useNavigate } from "react-router-dom";
import { useTemplateStore } from "../stores/useTemplateStore";
import Layout from "../layout";

function EditTemplatePage() {
  const { state } = useLocation();

  const [systemPrompt, setSystemPrompt] = useState(state.systemPrompt);
  const [label, setLabel] = useState(state.label);

  const { editTemplate } = useTemplateStore();

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
            Edit Template
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
            await editTemplate(state.index, label, systemPrompt);

            navigate("/");
          }}
        >
          Confirm
        </Button>
      </VStack>
    </Layout>
  );
}

export default EditTemplatePage;
