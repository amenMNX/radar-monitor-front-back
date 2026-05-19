import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tanstackStart({ server: { preset: "node-server" } }),
    tailwindcss(),
    viteReact(),
    tsConfigPaths(),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-start", "@tanstack/react-router"],
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  },
});