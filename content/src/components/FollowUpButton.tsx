import React, { useState } from "react";
import ReactDOM from "react-dom";
import { changeDraftJsPlaceholder, dispatchPaste } from "../utils/x-dom-utils";

import { timeout } from "../utils/common";
import { createFollowUpResponse, getConfigs } from "../lib/openai";

async function followUpHandler(followupInput: string) {
  const generatedTweet = document.querySelector('[data-text="true"]');

  var tweetInputField = document.querySelector(
    '[data-testid="tweetTextarea_0"]'
  ) as HTMLDivElement;

  tweetInputField.focus();

  document.execCommand("selectAll", false, undefined);
  await timeout(10);
  document.execCommand("cut", false, undefined);
  await timeout(10);

  const config = await getConfigs();

  changeDraftJsPlaceholder("Awaiting ChatGPT response...");

  if (!generatedTweet?.textContent) throw Error("No tweet found");

  const response = await createFollowUpResponse({
    tweet: generatedTweet.textContent,
    request: followupInput,
    ...config,
  });

  if (response) {
    tweetInputField.focus();

    dispatchPaste(tweetInputField, response + " ");
  }
}

function FollowUpButton() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [followupInput, setFollowupInput] = useState("");

  return (
    <>
      <button
        ref={buttonRef}
        className="inline-flex items-center justify-center bg-red-500 text-white px-2 py-1 rounded cursor-pointer z-50 text-center"
        onClick={async (event) => {
          setShowContextMenu(true);
        }}
      >
        Follow-up
      </button>
      {showContextMenu && (
        <div
          id="contextMenu-container"
          className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-100 pointer-events-none"
        >
          <div
            id="contextMenu"
            className="block absolute bg-white z-101 pointer-events-auto w-120 p-4"
          >
            <div className="flex flex-row space-x-2">
              <input
                className="w-full"
                placeholder="Enter follow-up prompt"
                onChange={(event) => setFollowupInput(event.target.value)}
              />
              <button
                onClick={async () => {
                  setShowContextMenu(false);

                  try {
                    if (!followupInput) {
                      throw Error("You must enter a follow up prompt.");
                    }

                    await followUpHandler(followupInput);
                  } catch (error) {
                    alert(error);
                  }
                }}
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FollowUpButton;
