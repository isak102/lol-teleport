import { extractDomain } from "$lib/utils";
import { expect, test } from "vitest";

test("can extract domain", () => {
  expect(extractDomain("https://xdx.gg/nexus-1v9")).toEqual("https://xdx.gg");
  expect(extractDomain("http://xdx.gg/nexus-1v9")).toEqual("http://xdx.gg");
  expect(extractDomain("http://www.xdx.gg/nexus-1v9")).toEqual("http://www.xdx.gg");
  expect(extractDomain("abcd")).toEqual(null);
});
