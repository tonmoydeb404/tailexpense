import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateColorObject(
  key: string,
  def?: string
): Record<string, string> {
  const result: Record<string, string> = {
    "50": `hsl(var(--${key}-50))`,
  };

  if (def) {
    result.DEFAULT = `hsl(var(--${key}-${def}))`;
  }

  for (let i = 100; i <= 900; i += 100) {
    result[`${i}`] = `hsl(var(--${key}-${i}))`;
  }
  return result;
}
