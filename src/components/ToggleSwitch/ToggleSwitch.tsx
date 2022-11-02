import React, { useState } from 'react';
import './ToggleSwitch.css';

interface MySwitchProps {
  disabled?: boolean;
  label: string;
  status?: boolean;
  onClick?: () => void;
}

function ToggleSwitch({ disabled = false, onClick = () => {}, status = false, label }: MySwitchProps) {
  return (
    <div className="container">
      <div className="labelContainer">{label}</div>
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
    </div>
  );
}

export default ToggleSwitch;
