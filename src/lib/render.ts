import type { VElement, VNode } from "./types";
import { isVElement } from "./util";
import { FRAGMENT_TAG, SELF_CLOSING_TAGS, SPECIAL_PROPS } from "./consts";

interface RenderOptions {
  debug?: boolean;
}

export const render = (element: VElement, options?: RenderOptions): string => {
  const _options = {
    debug: false,
    ...options,
  };

  const { type, children, props } = element;

  _options.debug && console.debug("render", { type, props, children });

  if (typeof type === "string") {
    if (type === FRAGMENT_TAG) {
      return childrenToString(children);
    }

    const elementName = type.trim().toLowerCase();

    let ret = `<${elementName}`;
    const elementIsSelfClosing =
      typeof props.$selfClosing === "boolean"
        ? props.$selfClosing
        : SELF_CLOSING_TAGS.has(elementName);

    // biome-ignore lint/complexity/noForEach: i love declarative code
    Object.entries(props)
      .filter(
        ([key, value]) =>
          value !== null && value !== undefined && !SPECIAL_PROPS.has(key),
      )
      .forEach(([key, value]) => {
        ret += propToAttribute(key, value as VNode);
      });

    ret += ">";

    if (!elementIsSelfClosing) {
      if (props?.$innerHTML !== undefined) {
        ret += props.$innerHTML;
      } else if (children.length > 0) {
        ret += childrenToString(children);
      }
      ret += `</${type}>`;
    }

    return ret;
  }

  if (typeof type === "function") {
    // @ts-expect-error TODO lol
    return render(type({ ...props, $children: children }), _options);
  }

  throw new Error("Invalid type");
};

const childrenToString = (children: unknown[]): string => {
  return children
    .map((child) => {
      if (isVElement(child)) {
        return render(child);
      }
      if (Array.isArray(child)) {
        return childrenToString(child);
      }

      return childToString(child);
    })
    .join("");
};

const childToString = (child: unknown): string => {
  if (child === null || child === undefined || typeof child === "boolean") {
    return "";
  }

  return child
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
};

const propToAttribute = (key: string, value: VNode): string => {
  if (typeof value === "boolean") {
    return value ? ` ${key}` : "";
  }

  return ` ${key}="${value
    ?.toString()
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")}"`;
};
