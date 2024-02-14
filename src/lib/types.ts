export type ComponentFunction = (props: InternalProps | null) => VElement;

export type PropValue = string | number | boolean;

export type SpecialProps = {
  $innerHTML?: string;
  $selfClosing?: boolean;
};
export type VNode = string | number | boolean | null | undefined | VElement;

export type InternalSpecialProps = {
  $children?: VNode[];
};

type _Props<T> = SpecialProps & Record<string, T>;
export type Props = _Props<PropValue>;

export type InternalProps = InternalSpecialProps & _Props<VNode>;

export type VElement = {
  __$$VElement: true;
  type: string | ComponentFunction;
  props: InternalProps;
  children: VNode[];
};

interface ElementAttributes {
  id?: string;
  class?: string;
  style?: string;
}

declare global {
  namespace JSX {
    type Element = VElement;
    interface IntrinsicElements {
      [elemName: string]: ElementAttributes & Props;
    }
  }
}
