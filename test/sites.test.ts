import { expect, test } from "vitest";
import type { Account } from "$lib/types";
import { SITES } from "$lib/sites";

test("should result in identical account after generating and extracting", async () => {
  const originalAcc: Account = {
    gameName: "Hide on bush",
    tagLine: "KR1",
    region: "kr",
  };

  for (const site of Object.values(SITES)) {
    if (site.slug == "lolpros") continue;

    const url = await site.generateUrl(originalAcc);

    delete site.parseRegion; // Cant parse region from DOM in tests
    const extractedAcc = await site.extractAccount(url!);

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

test("it handles url with query param", async () => {
  const url =
    "https://www.dodgetracker.com/region/kr/player/Hide%20on%20bush-KR1?timePeriod=allTime";

  const extractedAcc = await SITES["https://www.dodgetracker.com"].extractAccount(url);

  const expectedAcc: Account = {
    gameName: "Hide on bush",
    tagLine: "KR1",
    region: "kr",
  };

  expect(extractedAcc).toMatchObject(expectedAcc);
});

test("it handles accounts with ? in them", async () => {
  const url =
    "https://www.dodgetracker.com/region/kr/player/Hi?de%20on%20bush-KR1?timePeriod=allTime";

  const extractedAcc = await SITES["https://www.dodgetracker.com"].extractAccount(url);

  const expectedAcc: Account = {
    gameName: "Hi?de on bush",
    tagLine: "KR1",
    region: "kr",
  };

  expect(extractedAcc).toMatchObject(expectedAcc);
});
