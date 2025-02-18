import { z } from "zod";
import { Account } from "./types";
import { analytics } from "$analytics";

const responseSchema = z.array(
  z.object({
    slug: z.string(),
  }),
);

export async function getLolPros(gameName: string, tagLine: string) {
  const response = await fetch(
    `https://api.lolpros.gg/es/search/profile?query=${gameName}%23${tagLine}`,
  );
  const result = responseSchema.safeParse(await response.json());

  if (!result.success) {
    return null;
  } else {
    return result.data.length === 0 ? null : result.data[0].slug;
  }
}

export async function _lolProsExtractAccount(url: string) {
  const account = await new Promise<string | null>((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id! },
          func: () => {
            const selectedAccount = document.querySelector(".account.--selected");
            if (selectedAccount) {
              return selectedAccount.textContent?.trim();
            }

            const opggLink = document.querySelector("a.--opgg")?.getAttribute("href");
            return opggLink?.split("userName=")[1].replace("-", "#");
          },
        },
        ([{ result }]) => {
          resolve(result ?? null);
        },
      );
    });
  });

  if (!account) {
    analytics.capture(analytics.events.ACCOUNT_PARSE_FAILED, {
      site: {
        slug: "lolpros",
      },
      currentUrl: url,
    });
    return null;
  }

  const [gameName, tagLine] = account.split("#");
  return { gameName, tagLine, region: "euw1" } as Account;
}
