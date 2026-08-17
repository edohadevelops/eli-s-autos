import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Belt-and-suspenders: lets any .js file contain JSX, not just .jsx.
  // Without this, esbuild's dependency pre-scan can choke on a .js file
  // that returns JSX (e.g. a context provider) even if every import path
  // is correct, because the pre-scan step reads file extensions directly.
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.jsx?$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { ".js": "jsx" },
    },
  },
  server: {
    port: 5173,
  },
});
