import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  alias: {
    "$lib/*": "./src/lib/*",
    $lib: "./src/lib",
    "$components/*": "./src/components/*",
    $components: "./src/components",
    "$hooks/*": "./src/hooks/*",
    $hooks: "./src/hooks",
    "$analytics/*": "./src/analytics/*",
    $analytics: "./src/analytics",
  },
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-svelte"],

  outDir: "dist",

  manifest: {
    name: "LoL Teleport",
    permissions: ["activeTab", "scripting"],
  },

  zip: {
    artifactTemplate: "{{name}}.zip",
  },

  runner: {
    disabled: true,
  },
});
