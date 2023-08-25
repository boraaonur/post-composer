import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider } from "@chakra-ui/react";
import AddTemplatePage from "./pages/AddTemplate.tsx";

import { RouterProvider, createMemoryRouter } from "react-router-dom";

import EditTemplatePage from "./pages/EditTemplate.tsx";
import Home from "./pages/Home.tsx";
import Settings from "./pages/Settings.tsx";

const routes = [
  {
    path: "/",
    element: <Home />,
    // loader: () => FAKE_EVENT,
  },
  {
    path: "/add-template",
    element: <AddTemplatePage />,
    // loader: () => FAKE_EVENT,
  },
  {
    path: "/edit-template",
    element: <EditTemplatePage />,
    // loader: () => FAKE_EVENT,
  },
  {
    path: "/settings",
    element: <Settings />,
    // loader: () => FAKE_EVENT,
  },
];

const router = createMemoryRouter(routes, {
  initialEntries: ["/"],
  initialIndex: 0,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
