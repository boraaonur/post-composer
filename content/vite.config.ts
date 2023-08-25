import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, "src/main.tsx"),
      output: {
        dir: path.resolve(__dirname, "./dist"),
        entryFileNames: "content.js",
      },
    },
  },
});

/*
const path = require('path');

module.exports = {
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.tsx'),
      output: {
        dir: path.resolve(__dirname, '../extension'),
        entryFileNames: 'content.js'
      }
    }
  }
}

*/
