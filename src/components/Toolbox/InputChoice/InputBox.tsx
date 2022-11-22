import React from "react";
import { ButtonIcon } from "../../Shared/Buttons/ButtonIcon";

interface MySwitchProps {
  port: chrome.runtime.Port;
  disabled?: boolean;
  label: string;
  url: string;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
}

function InputBox({
  port,
  disabled = false,
  onClickFirst = () => {},
  onClickSecond = () => {},
  url,
  label,
}: MySwitchProps) {

  const Test = () => {
    port.postMessage("test");
  };

  return (
    <div
      style={{
        margin: "25px 15px 15px 15px",
        padding: "15px",
        fontSize: "15px",
        backgroundColor: "rgba(58, 112, 39, 0.5)",
        borderRadius: "10px",
      }}
    >
      <div style={{ textTransform: "uppercase", fontWeight: "bold" }}>
        {label}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10px",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div style={{ paddingRight: "5px" }}>{url}</div>
        <input
          type="number"
          style={{ width: "50px", marginRight: "5px" }}
          placeholder="000"
          min="0"
        />
        <div style={{ paddingRight: "25px" }}> min </div>
      </div>
      <div
        style={{
          paddingTop: "5px",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ButtonIcon title="Add rule" onClick={Test} />
        <ButtonIcon title="See rules" onClick={onClickSecond} />
      </div>
    </div>
  );
}

export default InputBox;
