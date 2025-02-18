import type { NormalRegion, UggRegion } from "$lib/regions";

export interface Account {
  gameName: string;
  tagLine: string;
  region: NormalRegion | UggRegion | undefined;
}

export interface Site {
  name: string;
  slug: string;
  domain: string;
  pattern: string;
  generateUrl: (account: Account) => Promise<string | null>;
  extractAccount: (url: string) => Promise<Account>;
  parseRegion?: () => string | undefined;
  usesUggRegion?: boolean;
}
