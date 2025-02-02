export const normalToUggMapping = {
  euw: "euw1",
  na: "na1",
  jp: "jp1",
  kr: "kr",
  la: "la1",
  la2: "la2",
  me: "me1",
  oc: "oc1",
  br: "br1",
  eun: "eun1",
  ph: "ph2",
  ru: "ru",
  sg: "sg2",
  th: "th2",
  tr: "tr1",
  tw: "tw2",
  vn: "vn2",
  pbe: "pbe1",
} as const;

export const uggToNormalMapping: {
  [K in (typeof normalToUggMapping)[keyof typeof normalToUggMapping]]: keyof typeof normalToUggMapping;
} = Object.entries(normalToUggMapping).reduce(
  (acc, [userRegion, riotRegion]) => {
    acc[riotRegion] = userRegion as keyof typeof normalToUggMapping;
    return acc;
  },
  {} as {
    [K in (typeof normalToUggMapping)[keyof typeof normalToUggMapping]]: keyof typeof normalToUggMapping;
  },
);

export type NormalRegion = keyof typeof normalToUggMapping;
export type UggRegion = keyof typeof uggToNormalMapping;

export function convertRegion(
  region: NormalRegion | UggRegion,
  toUgg: boolean,
): NormalRegion | UggRegion {
  if (toUgg && region in normalToUggMapping) {
    return normalToUggMapping[region as NormalRegion];
  }
  if (!toUgg && region in uggToNormalMapping) {
    return uggToNormalMapping[region as UggRegion];
  }
  return region;
}
