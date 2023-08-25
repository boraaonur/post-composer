import React, { useEffect, useState } from "react";

import { GPTTemplate } from "../types";
import { DRAFTJS_PLACEHOLDER, TWEET_INPUT_FIELD } from "../constants";

import useConfigStore from "../stores/ConfigStore";
import {
  getTweetTextToReply,
  changeDraftJsPlaceholder,
  dispatchPaste,
} from "../utils/x-dom-utils";
import { createReplyPost, getConfigs } from "../lib/openai";
import { langs } from "../constants/langs";
import { ErrorBoundary } from "react-error-boundary";

async function generateTweet(template: GPTTemplate) {
  const tweetText = getTweetTextToReply();

  const tweetInputField = document.querySelector(
    TWEET_INPUT_FIELD
  ) as HTMLDivElement;

  if (!tweetInputField) {
    throw new Error("Failed to locate the tweet input field.");
  }

  const config = await getConfigs();

  changeDraftJsPlaceholder("Awaiting ChatGPT response...");

  const response = await createReplyPost({
    template: template.systemPrompt,
    tweetToReply: tweetText,
    ...config,
  });

  dispatchPaste(tweetInputField, response);
}

export default function Header() {
  const { currentTemplate } = useConfigStore();

  return (
    <>
      <ErrorBoundary
        fallback={<></>}
        onError={(error) => {
          alert(error);
        }}
      >
        <div className="w-full bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 p-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <SelectLanguage />
              <SelectTemplate />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={async () => {
                try {
                  if (!currentTemplate) {
                    throw Error("You must select a template.");
                  }

                  await generateTweet(currentTemplate);
                } catch (error) {
                  alert(error);
                }
              }}
            >
              Generate
            </button>
          </div>
        </div>
      </ErrorBoundary>
    </>
  );
}

function SelectLanguage() {
  const { currentLanguage, selectLanguage } = useConfigStore();

  return (
    <select
      style={{
        width: "200px",
        height: "40px",
        fontSize: "16px",
        border: "1px solid #000000",
        padding: "5px",
        borderRadius: "5px",
      }}
      value={currentLanguage}
      onChange={(e) => {
        selectLanguage(e.target.value);
      }}
    >
      {Object.entries(langs).map(([key, value]) => {
        return <option value={`${value.name}`}>{value.name}</option>;
      })}
    </select>
  );
}

function SelectTemplate() {
  const { templates, currentTemplate, selectTemplate } = useConfigStore();

  return (
    <select
      value={currentTemplate?.label}
      className="w-48 h-10 text-base border-black border rounded-sm px-1"
      onChange={(event) => {
        const label = event.target.value;

        const template = templates.find((template) => template.label === label);

        if (template) {
          selectTemplate(template);
        }
      }}
    >
      {templates &&
        templates.map((template: any) => {
          return <option value={template.label}>{template.label}</option>;
        })}
    </select>
  );
}
