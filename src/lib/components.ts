import type { VElement } from "./types";
import { h } from "./jsx";
import { FRAGMENT_TAG } from "./consts";

export const Fragment = (props: Record<string, never>): VElement =>
  // @ts-expect-error
  h(FRAGMENT_TAG, null, ...props.$children);
