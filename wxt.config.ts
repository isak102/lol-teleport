import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  alias: {
    $lib: "./src/lib",
    $components: "./src/components",
    $hooks: "./src/hooks",
    $analytics: "./src/analytics",
  },
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],

  outDir: "dist",

  manifest: {
    name: "LoL Teleport",
    permissions: ["activeTab", "scripting"],

    host_permissions: ["https://api.lolpros.gg/*"],
  },

  zip: {
    artifactTemplate: "{{name}}.zip",
  },

  runner: {
    disabled: true,
  },
});
