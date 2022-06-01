import "./switch.styles.css";
import * as React from "react";
const noop = () => {};
export type HandleSwitchClick = React.MouseEventHandler<HTMLInputElement>;
type Props = {
  on: boolean;
  onClick: HandleSwitchClick;
  className?: string;
  ariaLabel?: string;
  [otherProps: string]: any;
};
function Switch({ on, className = "", ariaLabel, onClick, ...rest }: Props) {
  const btnClassName = [
    className,
    "toggle-btn",
    on ? "toggle-btn-on" : "toggle-btn-off"
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <label
      aria-label={ariaLabel || "Toggle"}
      style={{ display: "block" }}
      {...rest}
    >
      <input
        className="toggle-input"
        type="checkbox"
        checked={on}
        onChange={noop}
        onClick={onClick}
        data-testid="toggle-input"
      />
      <span className={btnClassName} />
    </label>
  );
}

export { Switch };
