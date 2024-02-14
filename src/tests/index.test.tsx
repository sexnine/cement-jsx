import { expect, test } from "vitest";
import { Fragment, h, render, style } from "../index";

test("element", () => {
  const A = <span>cool text!</span>;

  expect(render(A)).toBe("<span>cool text!</span>");
});

test("element with attributes", () => {
  const App = (
    <span id="text" class="font-bold">
      cool text!
    </span>
  );

  expect(render(App)).toBe(
    '<span id="text" class="font-bold">cool text!</span>',
  );
});

test("element with component child", () => {
  const ChildComponent = () => <div>I'm a child!</div>;
  const App = (
    <div>
      <ChildComponent />
    </div>
  );

  expect(render(App)).toBe("<div><div>I'm a child!</div></div>");
});

test("element with component child with attributes", () => {
  const ChildComponent = ({ title, text }: { title: string; text: string }) => (
    <div>
      {title}: {text}
    </div>
  );
  const App = (
    <div>
      <ChildComponent title="Mood" text="happy" />
    </div>
  );

  expect(render(App)).toBe("<div><div>Mood: happy</div></div>");
});

test("component with children", () => {
  // @ts-expect-error how does react do this??
  const Component = ({ $children }) => <div>{$children}</div>;

  const App = (
    // @ts-expect-error how does react do this??
    <Component>
      <div>First</div>
      <div>Second</div>
      text
    </Component>
  );

  expect(render(App)).toBe("<div><div>First</div><div>Second</div>text</div>");
});

test("fragment", () => {
  const App = (
    <Fragment>
      <div>First</div>
      <div>Second</div>
      text
    </Fragment>
  );

  expect(render(App)).toBe("<div>First</div><div>Second</div>text");
});

test("fragment shorthand", () => {
  const App = (
    <>
      <div>apples</div>
      <div>oranges</div>
      yummy
    </>
  );

  expect(render(App)).toBe("<div>apples</div><div>oranges</div>yummy");
});

test("style transform", () => {
  const App = (
    <div style={style({ color: "#aaa", marginTop: "8rem" })}>hey</div>
  );

  expect(render(App)).toBe(
    '<div style="color:#aaa;margin-top:8rem;">hey</div>',
  );
});

test("self closing elements", () => {
  const App = (
    <div>
      <input type="text" />
      <img src="sexnine.png" alt="sexnine" />
    </div>
  );

  expect(render(App)).toBe(
    '<div><input type="text"><img src="sexnine.png" alt="sexnine"></div>',
  );
});
