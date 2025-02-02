import type { PostHog } from "posthog-js";

import { version as extensionVersion } from "../../package.json";

export const analytics = {
  init: (page: "popup" | "options", extraData?: object) => {
    const startTime = performance.now();

    import("posthog-js/dist/module.full.no-external").then((module) => {
      const posthog = module.default as unknown as PostHog;
      const loadTime = performance.now() - startTime;

      posthog.init("phc_LAv0yIeqTWaJcskIjU7kb6OLhWCHGLHnK3yVIvtjXQI", {
        api_host: "https://eu.i.posthog.com",
        person_profiles: "always",
        persistence: "localStorage",
        capture_pageview: false,
        capture_pageleave: true,
      });

      posthog.capture(
        "$pageview",
        {
          page,
          extensionVersion,
          posthogLoadMs: loadTime,
          ...extraData,
        },
        { send_instantly: true },
      );
    });
  },

  capture: (...args: Parameters<PostHog["capture"]>) => {
    import("posthog-js/dist/module.full.no-external").then((module) => {
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
  } as const,
};
