import type {
  ComponentFunction,
  InternalProps,
  VElement,
  VNode,
} from "./types";

export const h = (
  type: string | ComponentFunction,
  props: InternalProps | null,
  ...children: VNode[]
): VElement => {
  return {
    __$$VElement: true,
    type,
    props: props ?? {},
    children,
  };
};
