import { defineManifest } from "@crxjs/vite-plugin";
import packageJson from "../package.json";

const { version, description } = packageJson;

// Convert from Semver (example: 0.1.0-beta6)
const [major, minor, patch] = version
  // can only contain digits, dots, or dash
  .replace(/[^\d.-]+/g, "")
  // split into version parts
  .split(/[.-]/);

const icons = {
  "48": "src/assets/icons/icon-48.png",
  "64": "src/assets/icons/icon-64.png",
  "128": "src/assets/icons/icon-128.png",
};

export default defineManifest(async () => ({
  manifest_version: 3,
  name: "LoL Teleport",
  description: description,
  version: `${major}.${minor}.${patch}`,
  version_name: version,
  icons,
  options_ui: {
    page: "src/options/options.html",
    open_in_tab: true,
  },
  action: {
    default_popup: "src/popup/popup.html",
    default_icon: icons,
  },
  permissions: ["activeTab", "scripting"] as chrome.runtime.ManifestPermissions[],
}));
