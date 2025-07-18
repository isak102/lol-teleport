import { expect, test } from "vitest";
import type { Account } from "$lib/types";
import { SITES } from "$lib/sites";
import { extractDomain } from "$lib/utils";

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
    if (site.domain == "https://xdx.gg" || site.domain == 'https://dpm.lol') {
      expectedAcc = {
        ...expectedAcc,
        region: undefined,
      };
    }

    expect(extractedAcc).toMatchObject(expectedAcc);
  }
});

test("should result in identical url after extracting and generating", async () => {
  const urls = [
    "https://www.leagueofgraphs.com/summoner/br/Pitt-Pit",
    "https://op.gg/summoners/euw/nexus-1v9",
    "https://u.gg/lol/profile/euw1/nexus-1v9/overview",
  ];

  for (const url of urls) {
    const domain = extractDomain(url)!;
    const site = SITES[domain as keyof typeof SITES];

    const extractedAcc = await site.extractAccount(url);
    const generatedUrl = await site.generateUrl(extractedAcc!);

    expect(generatedUrl).toEqual(url);
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

test("it handles sites with optional path segments", async () => {
  const url = "https://www.leagueofgraphs.com/summoner/champions/br/Pitt-Pit";

  const extractedAcc = await SITES["https://www.leagueofgraphs.com"].extractAccount(url);

  const expectedAcc: Account = {
    gameName: "Pitt",
    tagLine: "Pit",
    region: "br",
  };

  expect(extractedAcc).toMatchObject(expectedAcc);
});

test("it handles urls with # in them", async () => {
  const url = "https://www.leagueofgraphs.com/summoner/br/Pitt-Pit#champions";

  const extractedAcc = await SITES["https://www.leagueofgraphs.com"].extractAccount(url);

  const expectedAcc: Account = {
    gameName: "Pitt",
    tagLine: "Pit",
    region: "br",
  };

  expect(extractedAcc).toMatchObject(expectedAcc);
});

test("it handles urls with query params and # in them", async () => {
  const url = "https://www.leagueofgraphs.com/summoner/br/Pitt-Pit?timePeriod=week#champions";

  const extractedAcc = await SITES["https://www.leagueofgraphs.com"].extractAccount(url);

  const expectedAcc: Account = {
    gameName: "Pitt",
    tagLine: "Pit",
    region: "br",
  };

  expect(extractedAcc).toMatchObject(expectedAcc);
});
