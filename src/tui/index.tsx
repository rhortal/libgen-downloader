import React from "react";
import { render } from "ink";

import { LayoutWrapper } from "./layouts/Layout.js";
import { LAYOUT_KEY } from "./layouts/keys.js";
import App from "./App.js";
import { useBoundStore } from "./store/index.js";

interface renderTUIArgs {
  startInCLIMode: boolean;
  initialLayout?: LAYOUT_KEY;
}

export default function renderTUI({ startInCLIMode, initialLayout }: renderTUIArgs) {
  if (startInCLIMode) {
    const store = useBoundStore.getState();
    store.setCLIMode(true);
  } else {
    const clearANSI: string = process.platform === "win32" ? "u001b[H\u001bc" : "\u001b[2J";
    // reset screen pos
    process.stdout.write("\u001b[1;1H");
    // clear screen
    process.stdout.write(clearANSI);
  }

  render(
    <LayoutWrapper initialLayout={initialLayout || LAYOUT_KEY.SEARCH_LAYOUT}>
      <App doNotFetchConfigInitially={startInCLIMode} />
    </LayoutWrapper>
  );
}
