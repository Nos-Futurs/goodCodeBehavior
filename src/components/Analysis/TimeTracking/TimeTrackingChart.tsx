import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";

interface ChartProps {
  chartData: { title: string; value: number; color: string }[]
}

export const TimeTrackingChart = ({chartData}: ChartProps) => {

  return (
    <PieChart
      data={chartData}
      label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
      labelStyle={(index) => ({
        fontSize: "5px",
        fontWeight: "bold",
      })}
      animate={true}
    />
  );
};
