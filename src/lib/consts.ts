export const FRAGMENT_TAG = "__$$fragment";

export const SELF_CLOSING_TAGS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export const SPECIAL_PROPS = new Set([
  "$innerHTML",
  "$selfClosing",
  "$children",
]);
