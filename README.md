<div align="center">

# 🪨 cement-jsx

A simple, slim library for writing JSX without the **React**ivity
and purely for SSR

</div>

- **Is it like React**?

  nope, there's no reactivity but also not a drop-in replacement
  for non-reactive React code
- **Production ready?**

  fuck no
- **Secure?**

  maybe
- **Good DX?**

  lol no
- **Tiny?**

  yep

### how 2use

1. Specify the following options in `tsconfig.json`:
    ```json
    {
      "compilerOptions": {
        "jsx": "react",
        "jsxFactory": "h",
        "jsxFragmentFactory": "Fragment"
      }
    }
    ```

   And import `h` and `Fragment` from `cement-jsx`:
    ```ts
    import { h, Fragment } from "cement-jsx";
    ```
2. Write some beautiful JSX and render it
    ```tsx
    import { render } from "cement-jsx";
    
    const App = ({ adjective }) =>
      <div>Welcome to my {adjective} website!!</div>;
    
    const html = render(<App adjective="awesome" />);
    // -> "<div>Welcome to my awesome website!!</div>"
    ```

### things to keep in mind

1. **Setting the inner HTML**

   Set the inner HTML of an element using the `$innerHTML` attribute.
   This will not be sanitised, make sure you can
   trust the input.
    ```tsx
    const myHTML = "<span>yeah this be HTML</span>"
    
    // ⚛️ React 
    const App = <div dangerouslySetInnerHTML={{ __html: myHTML }} />
    
    // 🪨 cement-jsx
    const App = <div $innerHTML={myHTML} />
    ```
2. **Styles are not automatically converted**

   You must use the helper function `style` to convert CSS objects to strings.
   It will be converted with the rules of replacing capital letters with a
   hyphen followed by the lowercase letter.
    ```tsx
    // ❌
    const App = <div style={{ color: "#eee", marginTop: "8rem" }} />;
    // -> "<div style="[object Object]"></div>"
    
    // ✅
    import { style } from "cement-jsx";
    const App = <div style={style({ color: "#eee", marginTop: "8rem" })} />;
    // -> "<div style="color:#eee;margin-top:8rem;"></div>"
    ```
3. **Self closing tags**

   The following elements will automatically be self-closed:
   `area base br col embed hr imginput link meta param source track wbr`.
   To overwrite this behaviour for a particular element, use the
   `$selfClosing` attribute.

    ```tsx
    const App1 = <input />;
    // -> "<input>"
    const App2 = <input $selfClosing={false} />;
    // -> "<input></input>"
    const App3 = <div $selfClosing={true} />;
    // -> "<div>"
    ```