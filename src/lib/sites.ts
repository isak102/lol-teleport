import type { Account, Site } from "$lib/types";
import { _lolProsExtractAccount, getLolPros } from "./lolpros";
import { _defaultExtractAccount, _defaultGenerateUrl } from "./url";

const supportedSites = [
  {
    name: "OP.GG",
    slug: "opgg",
    domain: "https://op.gg",
    pattern: `/summoners/<region>/<gameName>-<tagLine>`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "LOLPros",
    slug: "lolpros",
    domain: "https://lolpros.gg",
    pattern: `/player/<slug>`,
    async generateUrl(account: Account) {
      if (!["euw1", "euw"].includes(account.region ?? "")) {
        return null;
      }

      const slug = await getLolPros(account.gameName, account.tagLine);
      return slug ? `https://lolpros.gg/player/${slug}` : null;
    },
    async extractAccount(url: string) {
      return _lolProsExtractAccount(url);
    },
  },
  {
    name: "U.GG",
    slug: "ugg",
    domain: "https://u.gg",
    pattern: "/lol/profile/<region>/<gameName>-<tagLine>/overview",
    usesUggRegion: true,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "League of Graphs",
    slug: "leagueofgraphs",
    domain: "https://www.leagueofgraphs.com",
    pattern: `/summoner/*/<region>/<gameName>-<tagLine>`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "Dodgetracker",
    slug: "dodgetracker",
    domain: "https://www.dodgetracker.com",
    pattern: `/region/<region>/player/<gameName>-<tagLine>`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "Deeplol.gg",
    slug: "deeplol",
    domain: "https://www.deeplol.gg",
    pattern: `/summoner/<region>/<gameName>-<tagLine>`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "Mobalytics",
    slug: "mobalytics",
    domain: "https://mobalytics.gg",
    pattern: `/lol/profile/<region>/<gameName>-<tagLine>/overview`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
  {
    name: "XDX.GG",
    slug: "xdx",
    domain: "https://xdx.gg",
    pattern: `/<gameName>-<tagLine>`,
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
    parseRegion: () => {
      return document.querySelector('[class^="SummonerInfo_region__"]')?.textContent?.toLowerCase();
    },
  },
  {
    name: "Porofessor",
    slug: "porofessor",
    domain: "https://porofessor.gg",
    pattern: "/live/<region>/<gameName>-<tagLine>",
    async generateUrl(account: Account) {
      return _defaultGenerateUrl(this, account);
    },
    async extractAccount(url: string) {
      return _defaultExtractAccount(this, url);
    },
  },
] as const satisfies readonly Site[];

export type SiteDomain = (typeof supportedSites)[number]["domain"];

export const SITES = Object.fromEntries(supportedSites.map((site) => [site.domain, site])) as {
  [D in SiteDomain]: Site;
};
