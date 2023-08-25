# Post Composer for X

A Chrome extension enabling users to utilize ChatGPT to generate reply tweets based on behavior templates and follow-ups.

## Key Features

- **Behavior Templates**: Easily create and manage templates (funny, aggressive, smart etc.).
- **ChatGPT Integration**: Leverage ChatGPT to automatically generate reply tweets.
- **Follow-up Tweets**: Generate sequences of tweets for continuous threads.
- **API Key Support**: Use your own OpenAI API key for personalized and cost-effective usage.

**Important:** This repository utilizes `openai@v4` and is configured with `dangerouslyAllowBrowser` set to `true`, allowing client-side API calls. This feature typically comes with security concerns, but there are specific reasons why I decided to utilize it.

### Why Use Direct Client-Side API Calls?

OpenAI generally recommends server-side API calls due to inherent security risks with client-side calls. However, my choice for client-side calls in this context is based on the following:

1. **Portfolio Purpose**: This extension is a showcase for [bora.dev](http://bora.dev) and isn't intended for publishing on the Chrome Store but rather as a demonstration.
2. **Security & Local Operations**: Your API Key is safely stored via `chrome.storage` utilities. All actions, from API Key storage to API calls, are executed on your device, minimizing external risks.

Given these reasons, the use of `dangerouslyAllowBrowser` in this context is relatively safe. Nevertheless, always use this extension with caution.

### Project Structure

- **/content**: A Vite React application. Webpack compiles the app into a single `content.js` file, adhering to the `manifest.json` specifications.
- **/popup**: A standalone Vite React application for the extension's popup functionality.
- **manifest.json**: This primary configuration file for the extension. Use `manifest.json` when manually installing this extension.