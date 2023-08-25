import OpenAI from "openai";
import { ChromeStorageUtils } from "@boraaonur/chrome-extension-utils";

async function getOpenAIClient(apiKey: string) {
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  return openai;
}

export async function getConfigs() {
  const [apiKey, gptModel, language] = await Promise.all([
    ChromeStorageUtils.get({ storageKey: "API_KEY" }),
    ChromeStorageUtils.get({ storageKey: "GPT_MODEL" }),
    ChromeStorageUtils.get({ storageKey: "LAST_SELECTED_LANGUAGE" }),
  ]);

  if (!apiKey) {
    throw new Error("You must provide an API Key in Extension Pop-up.");
  }

  if (!gptModel) {
    throw new Error("You must select a GPT Model in Extension Pop-up.");
  }

  if (!language) {
    throw new Error("You must select a language.");
  }

  const openaiClient = await getOpenAIClient(apiKey);

  return { openaiClient, gptModel, language };
}

export async function createReplyPost({
  template,
  tweetToReply,
  openaiClient,
  gptModel,
  language,
}: {
  template: string | null;
  tweetToReply: string;
  openaiClient: OpenAI;
  gptModel: string;
  language: string;
}) {
  try {
    const response = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Based on the given template type and language, craft a tweet in response to the user's tweet. Templates may include behavioral cues like "aggressive", "funny", "cringe", etc. Your response should align with the tone and style of the specified template while maintaining the given language setting.`,
        },
        {
          role: "user",
          content: `TWEET: ${tweetToReply}\nLANGUAGE: ${language}\nBEHAVIOR TEMPLATE: ${template}`,
        },
      ],
      model: gptModel,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error creating reply post:", error);
    throw error;
  }
}

export async function createFollowUpResponse({
  tweet,
  request,
  openaiClient,
  gptModel,
  language,
}: {
  tweet: string;
  request: string;
  openaiClient: OpenAI;
  gptModel: string;
  language: string;
}) {
  try {
    const response = await openaiClient.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `User will give you a tweet and ask you something to do. Perform his request.`,
        },
        {
          role: "user",
          content: `TWEET:${tweet}\nREQUEST:${request}`,
        },
      ],
      model: gptModel,
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error creating follow-up response:", error);
    throw error;
  }
}
