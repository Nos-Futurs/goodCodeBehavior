import React from "react";

const setDecreasingOrder = (
  dataTracked: {
    domain: string;
    bytes: number;
    energy: number;
    carbon: number;
  }[]
) => {
  dataTracked.sort((a, b) => b.bytes - a.bytes);
  return dataTracked;
};

interface CarbonDetailsProps {
  port: chrome.runtime.Port;
  startDate: Date | null;
  dataTracked: {
    domain: string;
    bytes: number;
    energy: number;
    carbon: number;
  }[];
}

export const CarbonDetails = ({
  port,
  dataTracked,
  startDate,
}: CarbonDetailsProps) => {
  const eraseTimeData = () => {
    port.postMessage("ResetAnalysis");
  };
  const timeTrackedDescending = setDecreasingOrder(dataTracked);

  return (
    <div style={{ margin: "15px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <div
          style={{ paddingRight: "15px" }}
        >{`The analysis started at : ${startDate?.toLocaleString()}`}</div>
        <button onClick={eraseTimeData}>Reset Analysis</button>
      </div>
      <div>
        {timeTrackedDescending.map(
          (item: {
            domain: string;
            bytes: number;
            energy: number;
            carbon: number;
          }) => {
            return (
              <div style={{ paddingTop: "3px" }}>{item.domain + " : " + Math.floor(item.bytes/1000) + " Mb"}</div>
            );
          }
        )}
      </div>
    </div>
  );
};
