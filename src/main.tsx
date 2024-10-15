import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme, ThemeProvider } from "@/lib/contexts/ThemeProvider";
import App from "./App.tsx";

import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <StrictMode>
    <ThemeProvider defaultTheme={Theme.DARK} storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </StrictMode>
);
