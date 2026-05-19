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
  // ── Dev proxy: forward /api/* to the Spring Boot backend ──────────────────
  // This lets the frontend call fetch("/api/radars") in development without
  // running into CORS issues or hard-coded ports.
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 4173,
    host: "0.0.0.0",
  },
});
