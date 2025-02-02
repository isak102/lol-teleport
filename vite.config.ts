import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";
import manifest from "./src/manifest.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), crx({ manifest })],
  // HACK: https://github.com/crxjs/chrome-extension-tools/issues/696
  // https://github.com/crxjs/chrome-extension-tools/issues/746
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 5173,
    },
  },
  resolve: {
    alias: {
      $components: path.resolve(__dirname, "src/components"),
      $lib: path.resolve(__dirname, "src/lib"),
      $hooks: path.resolve(__dirname, "src/hooks"),
      $analytics: path.resolve(__dirname, "src/analytics"),
    },
  },
});
