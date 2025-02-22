import { analytics } from "$analytics";
import { convertRegion, type NormalRegion, type UggRegion } from "$lib/regions";
import type { Account, Site } from "$lib/types";

type Params = keyof Account;

export function _defaultGenerateUrl(site: Site, account: Account) {
  if (account.region) {
    account.region = convertRegion(account.region, site.usesUggRegion ?? false);
  }

  const params = site.pattern.match(/<(\w+)>/g)?.map((param) => param.slice(1, -1));

  if (!params?.every((param) => typeof account[param as Params] === "string")) {
    return null;
  }

  return encodeURI(
    site.domain +
      site.pattern
        .replace("*/", "")
        .replace(/<(\w+)>/g, (_, key) => account[key as Params] as string),
  );
}

export async function _defaultExtractAccount(site: Site, url: string) {
  if (!url.startsWith(site.domain)) {
    return null;
  }

  const patternToRegex = site.pattern
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/<(\w+)>/g, "(?<$1>[^/]+)")
    .replace(/\*\//g, "(?:[^/]+/)?");

  const regex = new RegExp(patternToRegex);
  const urlWithoutQueryParams = url.replace(/\?[^?]*$/, "").replace(/#[^#]*$/, "");
  const match = decodeURIComponent(urlWithoutQueryParams).match(regex);

  if (!match?.groups) {
    analytics.capture(analytics.events.ACCOUNT_PARSE_FAILED, {
      site,
      currentUrl: url,
    });
    return null;
  }

  // Initially assign region from the URL groups, if available.
  let region: string | undefined = match.groups.region;

  if (!region && site.parseRegion) {
    region = await new Promise<string | undefined>((resolve) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id! },
            func: site.parseRegion!,
          },
          ([{ result }]) => {
            resolve(result);
          },
        );
      });
    });
  }

  const account: Account = {
    gameName: match.groups.gameName,
    tagLine: match.groups.tagLine,
    region: region as NormalRegion | UggRegion,
  };

  return account;
}
