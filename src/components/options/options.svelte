<script lang="ts">
  import { analytics } from "$analytics";
  import { ModeWatcher } from "mode-watcher";
  import { onMount } from "svelte";

  onMount(() => {
    analytics.init("options");
  });
</script>

<ModeWatcher />
<p>Options page</p>
