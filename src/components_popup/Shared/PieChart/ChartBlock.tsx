import React from "react";
import { ChartLegendItem } from "./Legend";
import { TimeTrackingChart } from "../../Analysis/TimeTracking/TimeTrackingChart";

interface ChartBlockProps {
  chartData: { title: string; value: number; color: string }[];
}

export const ChartBlock = ({ chartData }: ChartBlockProps) => {
  return (
    <div
      style={{
        margin: "10px",
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
          paddingLeft: "20px",
          paddingRight: "10px"
        }}
      >
        {chartData.map((legend) => {
          return <ChartLegendItem legendItem={legend} />;
        })}
      </div>
    </div>
  );
};
