import type { VElement } from "./types";

export const isVElement = (element: unknown): element is VElement =>
  // @ts-expect-error
  element?.__$$VElement === true;

type Styles = Omit<Partial<CSSStyleDeclaration>, "cssFloat" | "cssText">;
export const transformStyles = (styles: Styles): string =>
  Object.entries(styles)
    .map(([key, value]) => {
      const transformedKey = key
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
      return `${transformedKey}:${value};`;
    })
    .join("");
