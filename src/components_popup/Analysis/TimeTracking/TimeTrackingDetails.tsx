import React from "react";
import { formatItemTime } from "../methods/analysis.methods";

const setDecreasingOrder = (timeTracked: { domain: string; value: number }[]) => {
    timeTracked.sort((a, b) => b.value - a.value);
    timeTracked = timeTracked.filter(item => item.value >= 1)
    return timeTracked
};

interface TimeTrackingDetailsProps {
    port: chrome.runtime.Port;
    startDate: Date | null;
    timeTracked: { domain: string; value: number }[];
  }

export const TimeTrackingDetails = ({
  port,
  timeTracked,
  startDate,
}: TimeTrackingDetailsProps) => {
  const eraseTimeData = () => {
    port.postMessage("ResetAnalysis");
  };
  const timeTrackedDescending = setDecreasingOrder(timeTracked)

  return (
    <div style={{ margin: "15px" }}>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px" }}>
        <div style={{paddingRight: "15px"}}>{`The analysis started at : ${startDate?.toLocaleString()}`}</div>
        <button onClick={eraseTimeData}>Reset Analysis</button>
      </div>
      <div>
        {timeTrackedDescending.map((item: { domain: string; value: number }) => {
          return (
            <div style={{ paddingTop: "3px" }}>
              {item.domain + " : " + formatItemTime(item.value)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
