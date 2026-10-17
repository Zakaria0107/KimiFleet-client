import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
// `npm run build` runs two builds: the client bundle (dist/) and a server bundle (dist-ssr/,
// from src/entry-server.tsx) that scripts/prerender.mjs uses to write static HTML per route.
export default defineConfig(({ mode, isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8081,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    // The prerender script reads the manifest to link each page's JS/CSS chunks in its HTML.
    manifest: !isSsrBuild,
    rollupOptions: {
      output: {
        // Vendor chunks only apply to the client; in the SSR build these packages are external.
        manualChunks: isSsrBuild ? undefined : {
          // Separate vendor chunks for better caching
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-radix": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-slot",
          ],
          "vendor-ui": [
            "lucide-react",
            "framer-motion",
            "clsx",
            "tailwind-merge",
          ],
        },
      },
    },
    sourcemap: false,
    cssCodeSplit: true,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
  },
}));
