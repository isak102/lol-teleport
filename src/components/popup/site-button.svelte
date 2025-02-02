<script lang="ts">
  import { analytics } from "$analytics";
  import { Button, type ButtonProps } from "$components/ui/button";
  import type { Account, Site } from "$lib/types";
  import { generateUrl } from "$lib/url";

  let {
    url,
    toSite,
    fromSite,
    account,
    disabled,
    ...restProps
  }: ButtonProps & {
    url: string;
    toSite: Site;
    fromSite?: Site;
    account?: Account;
  } = $props();

  let newUrl = $derived.by(() => {
    if (account) return generateUrl(toSite, $state.snapshot(account));
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
  {...restProps}
>
  {toSite.name}
</Button>
