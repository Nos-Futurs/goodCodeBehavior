import React from "react";

const formatItemTime = (time: number) => {
  const timeInSeconds = Math.floor(time);
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  const hoursString = hours > 0 ? `${hours} hours ` : "";
  const minutesString = hours > 0 || minutes > 0 ? `${minutes} minutes ` : "";
  const secondsString = `${seconds} seconds`;
  return hoursString + minutesString + secondsString;
};

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
    port.postMessage("ResetTimeAnalysis");
  };
  const timeTrackedDescending = setDecreasingOrder(timeTracked)

  return (
    <div style={{ margin: "15px" }}>
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "15px" }}>
        <div style={{paddingRight: "15px"}}>{`The analysis started at : ${startDate?.toLocaleString()}`}</div>
        <button onClick={eraseTimeData}>Reset Time Analysis</button>
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
