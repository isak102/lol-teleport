import { mount } from "svelte";
import Options from "../components/options/options.svelte";
import "../tailwind.css";

// Options
// https://developer.chrome.com/docs/extensions/mv3/options/

function render() {
  const target = document.getElementById("app");

  if (target) {
    mount(Options, { target });
  }
}

document.addEventListener("DOMContentLoaded", render);
