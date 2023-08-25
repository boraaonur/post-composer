import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "./main.css";

const rootElement = document.createElement("div");
rootElement.id = "post-composer-extension";

document.body.appendChild(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
