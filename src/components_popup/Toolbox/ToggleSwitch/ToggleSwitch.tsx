import React from "react";
import { OnlyIconButton } from "../../Shared/Buttons/OnlyIconButton";
import infos from "./../../Assets/infos.png";
import "./ToggleSwitch.css";

interface MySwitchProps {
  disabled?: boolean;
  label: string;
  status?: boolean;
  onClick?: () => void;
  onInfosClick?: () => void;
}

function ToggleSwitch({
  disabled = false,
  onClick = () => {},
  onInfosClick = () => {},
  status = false,
  label,
}: MySwitchProps) {
  return (
    <div className="container">
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          disabled={disabled}
          checked={status}
          name={label}
          id={label}
          onChange={() => {
            onClick();
          }}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
      <div className="labelContainer">{label}</div>
      <OnlyIconButton icon={infos} onClick={() => {onInfosClick()}} />
    </div>
  );
}

export default ToggleSwitch;
