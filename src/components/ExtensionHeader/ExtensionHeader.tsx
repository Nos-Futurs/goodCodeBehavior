import React from "react";
import fake_logo from "./../Assets/fake_logo.png";

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
      <img src={fake_logo} style={{ paddingRight: "15px", width: "50px" }} />
      <text>GCB - Good Code Behavior</text>
    </header>
  );
};
