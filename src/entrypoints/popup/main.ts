import { mount } from "svelte";
import "../../tailwind.css";
import Popup from "./popup.svelte";

const app = mount(Popup, {
  target: document.getElementById("app")!,
});

export default app;
