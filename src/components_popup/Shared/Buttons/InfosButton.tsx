import React from "react";
import infos from "./../../Assets/infos.png";

interface InfosButtonProps {
  onClick: () => void;
  marginTop?: string;
}

export const InfosButton = ({
  onClick,
  marginTop = "15px",
}: InfosButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "rgba(217, 217, 217, 1)",
        borderRadius: "10px",
        marginTop,
        marginRight: "20px",
        padding: "3px",
        marginLeft: "15px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        outline: "none",
        border: "transparent",
        height: "40px",
      }}
    >
      <img
        src={infos}
        style={{ paddingRight: "10px", paddingLeft: "10px", width: "18px" }}
      />
    </button>
  );
};
