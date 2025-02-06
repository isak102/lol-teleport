import { expect, test } from "vitest";
import type { Account } from "$lib/types";
import { SITES } from "$lib/sites";
import { extractAccount, generateUrl } from "$lib/url";

test("should result in identical account after generating and extracting", async () => {
  const originalAcc: Account = {
    gameName: "Hide on bush",
    tagLine: "KR1",
    region: "kr",
  };

  for (const site of Object.values(SITES)) {
    const url = generateUrl(site, originalAcc);

    delete site.parseRegion; // Cant parse region from DOM in tests
    const extractedAcc = await extractAccount(site, url!);

    let expectedAcc = originalAcc;
    if (site.domain == "https://xdx.gg") {
      expectedAcc = {
        ...extractedAcc,
        region: undefined,
      };
    }

    expect(extractedAcc).toMatchObject(expectedAcc);
  }
});
