import React from "react";
import { ChartLegendItem } from "./Legend";
import { TimeTrackingChart } from "./TimeTrackingChart";

interface ChartBlockProps {
  chartData: { title: string; value: number; color: string }[];
}

export const ChartBlock = ({ chartData }: ChartBlockProps) => {
  return (
    <div
      style={{
        margin: "15px",
        padding: "15px",
        flexDirection: "row",
        display: "flex",
        alignItems: "center",
        border: "solid",
        borderWidth: "2px",
        borderColor: "rgba(58, 112, 39, 1)",
        borderRadius: "10px",
      }}
    >
      <TimeTrackingChart chartData={chartData} />
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          padding: "20px",
        }}
      >
        {chartData.map((legend) => {
          return <ChartLegendItem legendItem={legend} />;
        })}
      </div>
    </div>
  );
};
