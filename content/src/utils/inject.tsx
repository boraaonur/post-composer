import { safeInjectComponent } from "@boraaonur/chrome-extension-utils";
import FollowUpButton from "../components/FollowUpButton";
import Header from "../components/Header";

export const injectGPTHelperComponent = () => {
  safeInjectComponent({
    targetElement: `[role="progressbar"]`,
    position: "before",
    component: <Header />,
    id: "post-composer-generate-button",
  });
};

export const injectFollowUpButtonComponent = () => {
  const targetElement = document.querySelector(
    `[data-testid="toolBar"]`
  )?.firstElementChild;

  if (targetElement) {
    safeInjectComponent({
      targetElement: targetElement as HTMLElement,
      position: "append",
      component: <FollowUpButton />,
      id: "post-composer-followup-button",
    });
  }
};
