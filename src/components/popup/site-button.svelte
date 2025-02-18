<script lang="ts">
  import { analytics } from "$analytics";
  import { Button, type ButtonProps } from "$components/ui/button";
  import type { Account, Site } from "$lib/types";
  import { cn } from "$lib/utils";

  let {
    url,
    toSite,
    fromSite,
    account,
    disabled,
    class: className,
    ...restProps
  }: ButtonProps & {
    url: string;
    toSite: Site;
    fromSite?: Site;
    account?: Account;
  } = $props();

  let newUrl = $state<string | null>(null);
  $effect(() => {
    if (account) toSite.generateUrl($state.snapshot(account)).then((url) => (newUrl = url));
  });
</script>

<Button
  onclick={() => {
    analytics.capture(analytics.events.SITE_TELEPORT, {
      fromSite: fromSite!.slug,
      toSite: toSite.slug,
      fromUrl: url,
      toUrl: newUrl,
      account,
    });

    chrome.tabs.create({ url: newUrl! });
  }}
  disabled={!newUrl || !account || disabled || fromSite?.slug === toSite.slug}
  class={cn("disabled:pointer-events-auto disabled:cursor-not-allowed", className)}
  {...restProps}
>
  {toSite.name}
</Button>
