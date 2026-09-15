import React from "react";
import ReactDOM from "react-dom/client";
import "@patternfly/react-core/dist/styles/base.css";
import "./app.css";
import { App } from "./App";
import { SettingsProvider } from "./settings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </React.StrictMode>,
);
