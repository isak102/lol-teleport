import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractDomain(url: string) {
  const match = url.match(/^(https?:\/\/[^/]+)/i);
  return match ? match[1] : null;
}
