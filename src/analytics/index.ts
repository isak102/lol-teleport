import type { PostHog } from "posthog-js";

import { version as extensionVersion } from "../../package.json";

export const analytics = {
  init: function (page: "popup" | "options", extraData?: object) {
    const startTime = performance.now();

    // TODO: Keep track of these issues and confirm when they do not include any obfuscated code, so I can include
    // the full posthog module and enable recording.
    // https://github.com/rrweb-io/rrweb/issues/1578
    // https://github.com/PostHog/posthog-js/issues/1464
    import("posthog-js/dist/module.no-external").then((module) => {
      const posthog = module.default as unknown as PostHog;
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
    import("posthog-js/dist/module.no-external").then((module) => {
      const posthog = module.default as unknown as PostHog;
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
  },
} as const;
