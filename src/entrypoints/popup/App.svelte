<script lang="ts">
  import { SITES, type SiteDomain } from "$lib/sites";
  import { ModeWatcher } from "mode-watcher";
  import { onMount } from "svelte";
  import SiteButton from "$components/popup/site-button.svelte";
  import { extractDomain } from "$lib/utils";
  import ThemeSwitch from "$components/ui/theme-switch.svelte";
  import { analytics } from "$analytics";
  import type { Account } from "$lib/types";

  let currentTab = $state<chrome.tabs.Tab | undefined>();
  let account = $state<Account | undefined>();

  let currentSite = $derived.by(() => {
    if (currentTab?.url) {
      const domain = extractDomain(currentTab.url);
      return domain ? (SITES[domain as SiteDomain] ?? undefined) : undefined;
    }
  });

  onMount(async () => {
    currentTab = await (async () => {
      const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tabs.length > 0) {
        return tabs[0];
      }
    })();

    account = await (async () => {
      if (currentSite && currentTab?.url) return currentSite.extractAccount(currentTab!.url!);
    })();

    analytics.init("popup", { currentSite, currentTab });
  });

  // TODO: Make the interval check X amount of times, and then dont check more
  $effect(() => {
    let interval: NodeJS.Timeout;

    if (currentTab && currentSite && !account?.region) {
      interval = setInterval(async () => {
        if (currentSite && currentTab?.url) {
          const res = await currentSite.extractAccount(currentTab!.url!);
          if (res) account = res;
        }
      }, 1000);
    }

    return () => {
      return clearInterval(interval);
    };
  });

  const extensionName = "LoL Teleport";
</script>

<ModeWatcher />
<div class="flex h-[300px] w-[400px] flex-col gap-2 p-2">
  <div class="flex items-center justify-center gap-2 border-b-2 pb-2">
    <img src="/icon-48.png" alt="Icon" />
    <h1 class="text-4xl font-bold">{extensionName}</h1>
  </div>
  <div class="flex flex-col items-center justify-center">
    {#if currentSite && account}
      <h2 class="text-2xl font-bold">Detected Account</h2>
      <p class="text-xl">
        {`${account.gameName}#${account.tagLine}`}
      </p>
    {:else}
      <p class="px-8 text-center text-xl">{extensionName} is not supported on this site :(</p>
    {/if}
  </div>
  <div class="flex flex-wrap justify-center gap-2">
    {#each Object.values(SITES) as site}
      <SiteButton
        url={currentTab?.url ?? ""}
        toSite={site}
        fromSite={currentSite}
        disabled={!currentSite}
        {account}
      />
    {/each}
  </div>
  <div class="absolute bottom-2 right-2">
    <ThemeSwitch />
  </div>
</div>
