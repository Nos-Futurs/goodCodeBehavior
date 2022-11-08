import React from "react";

interface ChartLegendProps {
  legendItem: { title: string; value: number; color: string };
}

export const ChartLegendItem = ({ legendItem }: ChartLegendProps) => {
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        marginBottom: "8px",
      }}
    >
      <div
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: legendItem.color,
        }}
      />
      <div style={{ paddingLeft: "10px" }}>{legendItem.title}</div>
    </div>
  );
};
