<script lang="ts">
  import Sun from "lucide-svelte/icons/sun";
  import Moon from "lucide-svelte/icons/moon";

  import { resetMode, setMode } from "mode-watcher";
  import * as DropdownMenu from "../ui/dropdown-menu/index";
  import { buttonVariants } from "../ui/button/index";
  import { analytics } from "$analytics/index";
</script>

<DropdownMenu.Root
  onOpenChange={(open) => {
    if (open) analytics.capture(analytics.events.THEME_MENU_OPENED);
  }}
>
  <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
    <Sun
      class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
      class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Item
      onclick={() => {
        analytics.capture(analytics.events.THEME_CHANGED, { theme: "light" });
        setMode("light");
      }}>Light</DropdownMenu.Item
    >
    <DropdownMenu.Item
      onclick={() => {
        analytics.capture(analytics.events.THEME_CHANGED, { theme: "dark" });
        setMode("dark");
      }}>Dark</DropdownMenu.Item
    >
    <DropdownMenu.Item
      onclick={() => {
        analytics.capture(analytics.events.THEME_CHANGED, { theme: "system" });
        resetMode();
      }}>System</DropdownMenu.Item
    >
  </DropdownMenu.Content>
</DropdownMenu.Root>
