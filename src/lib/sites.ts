import type { Site } from "$lib/types";

const supportedSites = [
  {
    name: "OP.GG",
    slug: "opgg",
    domain: "https://www.op.gg",
    pattern: `/summoners/<region>/<gameName>-<tagLine>`,
  },
  {
    name: "U.GG",
    slug: "ugg",
    domain: "https://u.gg",
    pattern: "/lol/profile/<region>/<gameName>-<tagLine>/overview",
    usesUggRegion: true,
  },
  {
    name: "League of Graphs",
    slug: "leagueofgraphs",
    domain: "https://www.leagueofgraphs.com",
    pattern: `/summoner/<region>/<gameName>-<tagLine>`,
  },
  {
    name: "Dodgetracker",
    slug: "dodgetracker",
    domain: "https://www.dodgetracker.com",
    pattern: `/region/<region>/player/<gameName>-<tagLine>`,
  },
  {
    name: "Deeplol.gg",
    slug: "deeplol",
    domain: "https://www.deeplol.gg",
    pattern: `/summoner/<region>/<gameName>-<tagLine>`,
  },
  {
    name: "Mobalytics",
    slug: "mobalytics",
    domain: "https://mobalytics.gg",
    pattern: `/lol/profile/<region>/<gameName>-<tagLine>/overview`,
  },
  {
    name: "XDX.GG",
    slug: "xdx",
    domain: "https://xdx.gg",
    pattern: `/<gameName>-<tagLine>`,
    parseRegion: () => {
      return document.querySelector('[class^="SummonerInfo_region__"]')?.textContent?.toLowerCase();
    },
  },
  {
    name: "Porofessor",
    slug: "porofessor",
    domain: "https://porofessor.gg",
    pattern: "/live/<region>/<gameName>-<tagLine>",
  },
] as const satisfies readonly Site[];

export type SiteDomain = (typeof supportedSites)[number]["domain"];

export const SITES = Object.fromEntries(supportedSites.map((site) => [site.domain, site])) as {
  [D in SiteDomain]: Site;
};
