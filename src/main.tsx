import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add loaded class to body after initial render
document.body.classList.add('loaded');

createRoot(document.getElementById("root")!).render(<App />);
