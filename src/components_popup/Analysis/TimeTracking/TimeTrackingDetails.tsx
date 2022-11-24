import React from "react";
import { formatItemTime } from "./Time.methods";

const setDecreasingOrder = (timeTracked: { domain: string; time: string }[]) => {
    timeTracked.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
    return timeTracked
};

interface TimeTrackingDetailsProps {
    port: chrome.runtime.Port;
    startDate: Date | null;
    timeTracked: { domain: string; time: string }[];
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
        {timeTrackedDescending.map((item: { domain: string; time: string }) => {
          return (
            <div style={{ paddingTop: "3px" }}>
              {item.domain + " : " + formatItemTime(parseInt(item.time))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
