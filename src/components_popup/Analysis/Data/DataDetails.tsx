import React from "react";

const setDecreasingOrder = (
  dataTracked: {
    domain: string;
    value: number;
  }[]
) => {
  dataTracked.sort((a, b) => b.value - a.value);
  return dataTracked;
};

interface DataDetailsProps {
  port: chrome.runtime.Port;
  startDate: Date | null;
  dataTracked: {
    domain: string;
    value: number;
  }[];
}

export const DataDetails = ({
  port,
  dataTracked,
  startDate,
}: DataDetailsProps) => {
  const eraseTimeData = () => {
    port.postMessage("ResetAnalysis");
  };
  const dataTrackedDescending = setDecreasingOrder(dataTracked);

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
        {dataTrackedDescending.map(
          (item: { domain: string; value: number }) => {
            if (Math.floor(item.value / (1000 * 1000)) > 0) {
              return (
                <div style={{ paddingTop: "3px" }}>
                  {item.domain +
                    " : " +
                    Math.floor(item.value / (1000 * 1000)) +
                    " Mb"}
                </div>
              );
            }
          }
        )}
      </div>
    </div>
  );
};
