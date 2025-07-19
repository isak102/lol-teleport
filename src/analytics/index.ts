import type { PostHog } from "posthog-js";

import { version as extensionVersion } from "../../package.json";

async function importPosthog() {
  const [posthog, _] = await Promise.all([
    import("posthog-js/dist/module.no-external"),
    // TODO: Change the import below when this gets fixed
    // https://github.com/PostHog/posthog-js/issues/1464#issuecomment-2778027739
    // @ts-expect-error: This exists but has no types
    import("posthog-js/dist/posthog-recorder.js"),
  ]);

  return posthog.default as unknown as PostHog;
}

function isEnabled() {
  return import.meta.env.PROD || !!import.meta.env.VITE_PUBLIC_ANALYTICS;
}

export const analytics = {
  init: function (page: "popup" | "options", extraData?: object) {
    if (!isEnabled()) return;

    const startTime = performance.now();

    importPosthog().then((posthog) => {
      const loadTime = performance.now() - startTime;

      posthog.init("phc_LAv0yIeqTWaJcskIjU7kb6OLhWCHGLHnK3yVIvtjXQI", {
        api_host: "https://eu.i.posthog.com",
        person_profiles: "always",
        persistence: "localStorage",
        capture_pageview: false,
        capture_pageleave: true,
      });

      this.capture("$pageview", { page, posthogLoadMs: Number(loadTime.toFixed(2)), ...extraData });
    });
  },

  capture: function (...args: Parameters<PostHog["capture"]>) {
    if (!isEnabled()) return;

    importPosthog().then((posthog) => {
      posthog.capture(
        args[0],
        {
          ...args[1],
          extensionVersion,
        },
        { ...args[2], send_instantly: true },
      );
    });
  },

  events: {
    SITE_TELEPORT: "site_teleport",
    THEME_CHANGED: "theme_changed",
    THEME_MENU_OPENED: "theme_menu_opened",
    ACCOUNT_PARSE_FAILED: "account_parse_fail",
    LOLPROS_QUERY: "lolpros_query",
  },
} as const;
