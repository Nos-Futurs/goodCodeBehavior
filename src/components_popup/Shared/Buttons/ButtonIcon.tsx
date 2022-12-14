import React from "react";

interface ButtonIconProps {
  icon?: string;
  title: string;
  onClick: () => void;
}

export const ButtonIcon = ({ icon, title, onClick }: ButtonIconProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(217, 217, 217, 1)",
        borderRadius: "10px",
        marginRight: "20px",
        padding: "3px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        outline: "none",
        border: "transparent",
      }}
    >
      <div
        style={{
          padding: "6px",
          paddingLeft: "10px",
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        {title}
      </div>
      {icon ? (
        <img src={icon} style={{ paddingRight: "10px", paddingLeft: "13px", width:"15px" }} />
      ) : (
        <></>
      )}
    </button>
  );
};
