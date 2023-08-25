import { DRAFTJS_PLACEHOLDER } from "../constants";

export function changeDraftJsPlaceholder(newPlaceholder: string) {
  // Get placeholder
  let div = document.querySelector(DRAFTJS_PLACEHOLDER);

  // Change placeholder if it exists...
  if (div) {
    // Change its content
    div.textContent = newPlaceholder;
  }
}

export function dispatchPaste(target: any, text: any) {
  const dataTransfer = new DataTransfer();
  // this may be 'text/html' if it's required
  dataTransfer.setData("text/plain", text);

  target.dispatchEvent(
    new ClipboardEvent("paste", {
      clipboardData: dataTransfer,

      // need these for the event to reach Draft paste handler
      bubbles: true,
      cancelable: true,
    })
  );

  // clear DataTransfer Data
  dataTransfer.clearData();
}

export function findTweetNodeWithReplyInput() {
  let replyAttachedTweetNode: Element | null = null;

  let parentNodes = document.querySelectorAll('[data-testid="cellInnerDiv"]');

  for (let parentNode of parentNodes) {
    let childNode = parentNode.querySelector(
      '[data-testid="tweetButtonInline"]'
    );

    if (childNode) {
      // This is the parentNode we are looking for
      replyAttachedTweetNode = parentNode;
      break; // Break the loop
    }
  }

  if (!replyAttachedTweetNode) {
    throw Error("Couldn't find the tweet element to reply to.");
  }

  return replyAttachedTweetNode;
}

export function getTweetTextToReply() {
  // Step 1: Find the (cellInnerDiv) tweet "Reply div" is attached to
  let replyAttachedTweetNode = findTweetNodeWithReplyInput();

  // Step 2:
  let span = replyAttachedTweetNode.querySelector(
    '[data-testid="tweetText"] span'
  );

  let tweetText = span?.textContent;

  if (!tweetText) {
    throw Error("Couldn't find the tweet text to reply to.");
  }

  return tweetText;
}
