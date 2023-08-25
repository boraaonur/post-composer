import {
  Box,
  Button,
  Center,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { IconButton } from "@chakra-ui/react";

import { HiRefresh, HiPlus, HiCog, HiHome } from "react-icons/hi";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useTemplateStore } from "../stores/useTemplateStore";
import Layout from "../layout";

function Home() {
  const { templates, removeTemplate, refreshTemplates } = useTemplateStore();
  const navigate = useNavigate();

  return (
    <Layout
      header={
        <HStack width="full" justify="space-between">
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<HiRefresh />}
            onClick={refreshTemplates}
          />

          <Text fontWeight="bold" fontSize={20}>
            Templates
          </Text>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            icon={<HiPlus />}
            onClick={() => {
              navigate("/add-template");
            }}
          />
        </HStack>
      }
    >
      <Accordion allowMultiple width="full" pt="8px">
        {templates &&
          templates.map((template, index) => {
            return (
              <AccordionItem width="full">
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      {template.label}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>

                <AccordionPanel pb={4}>
                  <p>{template.systemPrompt}</p>
                  <HStack w="full" justifyContent="space-between" pt="4">
                    <Button
                      size="xs"
                      colorScheme="blue"
                      onClick={() => {
                        navigate("/edit-template", {
                          state: {
                            index: index,
                            label: template.label,
                            systemPrompt: template.systemPrompt,
                          },
                        });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => removeTemplate(index)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
      </Accordion>
    </Layout>
  );
}

export default Home;
