import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n.ts";

// Add loaded class to body after initial render
document.body.classList.add('loaded');

createRoot(document.getElementById("root")!).render(<App />);
