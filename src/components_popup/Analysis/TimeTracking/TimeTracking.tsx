import React, { useEffect, useState } from "react";
import { storageObject } from "../../../chrome_background/modules/Shared.module";
import { SimpleModal } from "../../Modal/Modal";
import { useModalContext } from "../../Modal/modalContext";
import { IconButton } from "../../Shared/Buttons/IconButton";
import { InfosButton } from "../../Shared/Buttons/InfosButton";
import { ChartBlock } from "../../Shared/PieChart/ChartBlock";
import details from "./../../Assets/details.png";
import { timeTrackingPercentage } from "./Time.methods";
import { TimeInfos } from "./TimeInfos";
import { TimeTrackingDetails } from "./TimeTrackingDetails";
interface TimeTrackingProps {
  port: chrome.runtime.Port;
}

export const TimeTracking = ({ port }: TimeTrackingProps) => {
  const [timeTracked, setTimeTracked] = useState<any>([]);
  const [shwoDetails, setShwoDetails] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [chartData, setChartData] = useState<
    { title: string; value: number; color: string }[]
  >([]);
  const { openModal } = useModalContext();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "tabsTimeObject",
        "startingTimeAnalyseDate",
      ]);
      const dataObject = storageObject(data["tabsTimeObject"]);
      const startingAnalyseDate = storageObject(data["startingTimeAnalyseDate"]);
      let dataArray = [];
      for (let timeInfos in dataObject) {
        dataArray.push({
          domain: timeInfos,
          time: dataObject[timeInfos].trackedSeconds,
        });
      }
      setChartData(timeTrackingPercentage(dataArray));
      setStartDate(new Date(startingAnalyseDate));
      setTimeTracked(dataArray);
    };
    // call the function
    fetchData();
  }, []);

  return (
    <div style={{ flexDirection: "column" }}>
      <div
        style={{
          marginTop: "10px",
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ChartBlock chartData={chartData} />
        <div
          style={{
            margin: "0px 15px 15px 15px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <IconButton
            title={"Detail"}
            icon={details}
            onClick={() => {
              setShwoDetails(!shwoDetails);
            }}
          />
          <div>
            <InfosButton onClick={() => openModal()} />
            <SimpleModal>
              <TimeInfos />
            </SimpleModal>
          </div>
        </div>
      </div>

      {shwoDetails && (
        <TimeTrackingDetails
          port={port}
          startDate={startDate}
          timeTracked={timeTracked}
        />
      )}
    </div>
  );
};
