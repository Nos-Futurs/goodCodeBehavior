import React from "react";

interface ItemTrackingProps {
  number: number;
  icon: string;
  text: string;
  measures?: string;
  toFixNumber?: number;
}

export const ItemTracking = ({
  text,
  number,
  icon,
  measures,
  toFixNumber = 2,
}: ItemTrackingProps) => {
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        marginBottom: "10px",
        alignItems: "center",
      }}
    >
      <img src={icon} style={{ paddingRight: "10px", width: "20px" }} />
      <div style={{ paddingRight: "10px", fontSize: "15px" }}>{text}</div>
      <div style={{ fontWeight: "bold", fontSize: "15px" }}>
        {number.toFixed(toFixNumber)}
      </div>
      {measures && (
        <div style={{ paddingLeft: "10px", fontSize: "15px" }}>{measures}</div>
      )}
    </div>
  );
};
