import React from "react";
import { ButtonIcon } from "../../Shared/Buttons/ButtonIcon";

interface MySwitchProps {
  disabled?: boolean;
  label: string;
  url: string;
  onClickFirst?: () => void;
  onClickSecond?: () => void;
}

function InputBox({
  disabled = false,
  onClickFirst = () => {},
  onClickSecond = () => {},
  url,
  label,
}: MySwitchProps) {
  return (
    <div
      style={{
        margin: "15px",
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
        <select style={{ width: "50px", marginRight: "5px" }} />
        <div style={{ paddingRight: "25px" }}> min </div>
        <ButtonIcon title="Add rules" onClick={onClickFirst} />
      </div>
      <ButtonIcon title="See rules" onClick={onClickSecond} />
    </div>
  );
}

export default InputBox;
