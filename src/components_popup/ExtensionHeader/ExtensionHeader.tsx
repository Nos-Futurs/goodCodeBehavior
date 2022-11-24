import React from "react";
import fake_logo from "./../Assets/GCB_Logo.png";

interface ExtensionHeaderProps {}

export const ExtensionHeader = ({}: ExtensionHeaderProps) => {
  return (
    <header
      style={{
        padding: "10px",
        fontSize: "20px",
        alignItems: "center",
        display: "flex",
        fontWeight: "bold",
        textTransform: "uppercase",
        margin: "10px",
      }}
    >
      <img src={fake_logo} style={{ paddingRight: "15px", width: "60px" }} />
      <text>GCB - Good Code Behaviour</text>
    </header>
  );
};
