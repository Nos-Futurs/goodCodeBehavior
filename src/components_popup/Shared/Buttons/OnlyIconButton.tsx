import React from "react";

interface OnlyIconButtonProps {
  icon: string;
  onClick: () => void;
}

export const OnlyIconButton = ({ icon, onClick }: OnlyIconButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "transparent",
        display: "flex",
      }}
    >
      <img
        src={icon}
        style={{ paddingRight: "10px", paddingLeft: "13px", width: "18px" }}
      />
    </button>
  );
};
