// Prop Collections and Getters
// 💯 prop getters
// https://github.com/kentcdodds/advanced-react-patterns/blob/main/src/final/04.extra-1.js

import * as React from "react";
import { Switch } from "./Switch";

type HandleClick<T> = React.MouseEventHandler<T>;

const callAll: <T>(...handlers: HandleClick<T>[]) => HandleClick<T> = (
  ...handlers
) => (e) => {
  handlers.forEach((f) => f(e));
};

function useToggle() {
  const [on, setOn] = React.useState(false);
  const toggle = () => setOn(!on);
  const outerOn = on;
  function getTogglerProps<T>({
    onClick,
    on,
    ...rest
  }: {
    onClick?: HandleClick<T>;
    on?: boolean;
    [otherProps: string]: any;
  }): { on: boolean; onClick: HandleClick<T>; [key: string]: any } {
    const innerOn = on || outerOn;
    return {
      on: innerOn,
      "aria-pressed": String(innerOn),
      onClick: onClick ? callAll(onClick, toggle) : toggle,
      ...rest
    };
  }
  return {
    on,
    toggle,
    getTogglerProps
  };
}

function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch {...getTogglerProps<HTMLInputElement>({ on })} />
      <hr />
      <button
        {...getTogglerProps<HTMLButtonElement>({
          "aria-label": "custom-button",
          onClick: () => console.info("onButtonClick"),
          id: "custom-button-id",
          on: "on" as any // will not be used. for remove console.err
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}

export default App;
