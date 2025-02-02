import { mount } from "svelte";
import Popup from "../components/popup/popup.svelte";
import "../tailwind.css";

// Action popup
// https://developer.chrome.com/docs/extensions/reference/action/

function render() {
  const target = document.getElementById("app");

  if (target) {
    mount(Popup, { target });
  }
}

document.addEventListener("DOMContentLoaded", render);
