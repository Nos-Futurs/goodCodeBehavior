import React from "react";

interface IconButtonProps {
  icon?: string;
  title: string;
  onClick: () => void;
}

export const IconButton = ({ icon, title, onClick }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(217, 217, 217, 1)",
        borderRadius: "10px",
        marginTop: "15px",
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
      {icon ? (
        <img src={icon} style={{ paddingRight: "10px", paddingLeft: "13px" }} />
      ) : (
        <></>
      )}
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
    </button>
  );
};
