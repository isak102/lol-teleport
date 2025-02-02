import { convertRegion, type NormalRegion, type UggRegion } from "$lib/regions";
import type { Account, Site } from "$lib/types";

type Params = keyof Account;

export function generateUrl(site: Site, account: Account) {
  if (account.region) {
    account.region = convertRegion(account.region, site.usesUggRegion ?? false);
  }

  const params = site.pattern.match(/<(\w+)>/g)?.map((param) => param.slice(1, -1));

  if (!params?.every((param) => typeof account[param as Params] === "string")) {
    return null;
  }

  return encodeURI(
    site.domain + site.pattern.replace(/<(\w+)>/g, (_, key) => account[key as Params] as string),
  );
}

export async function extractAccount(site: Site, url: string) {
  if (!url.startsWith(site.domain)) {
    throw new Error("Incorrect domain.");
  }

  const patternToRegex = site.pattern
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/<(\w+)>/g, "(?<$1>[^/]+)");

  const regex = new RegExp(patternToRegex);
  const match = decodeURIComponent(url).match(regex);

  if (!match?.groups) {
    throw new Error("Invalid URL");
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
