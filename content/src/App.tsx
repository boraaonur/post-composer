// import { useState } from "react";
import ReactDOM from "react-dom";
import React, { useEffect, useState, useRef } from "react";
import GPTHelper from "./components/Header";
import FollowUpButton from "./components/FollowUpButton";

import {
  injectFollowUpButtonComponent,
  injectGPTHelperComponent,
} from "./utils/inject";

const observerOptions = {
  childList: true,
  subtree: true,
};

const mutationHandler: MutationCallback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    injectGPTHelperComponent();
    injectFollowUpButtonComponent();
  }
};

function App() {
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    // Creating and starting the observer
    observer.current = new MutationObserver(mutationHandler);
    observer.current.observe(document.body, observerOptions);

    return () => {
      if (observer.current) {
        console.log("Disconnecting the observer");
        observer.current.disconnect();
      }
    };
  }, []);

  return null;
}

export default App;
