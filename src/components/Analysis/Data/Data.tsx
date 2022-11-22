import React, { useEffect, useState } from "react";
import { IconButton } from "../../Shared/Buttons/IconButton";
import { ChartBlock } from "../../Shared/PieChart/ChartBlock";
import details from "./../../Assets/details.png";
import infos from "./../../Assets/infos.png";
import { DataDetails } from "./DataDetails";
import { dataTrackingPercentage } from "./methods/dataAnalysis.methods";

interface EnergyCarbonTrackingProps {
  port: chrome.runtime.Port;
}

export const DataTracking = ({ port }: EnergyCarbonTrackingProps) => {
  const [allDataTracked, setAllDataTracked] = useState<any>([]);
  const [shwoDetails, setShwoDetails] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dataChartData, setDataChartData] = useState<
    { title: string; value: number; color: string }[]
  >([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "TabsCarbon",
        "startingTimeAnalyseDate",
      ]);
      const dataObject = JSON.parse(data["TabsCarbon"]);
      const startingAnalyseDate = JSON.parse(data["startingTimeAnalyseDate"]);
      let dataArray = [];
      for (let dataINfo in dataObject) {
        dataArray.push({
          domain: dataINfo,
          bytes: parseInt(dataObject[dataINfo]),
        });
      }
      const percentageArray = dataTrackingPercentage(dataArray);
      setDataChartData(percentageArray);
      setStartDate(new Date(startingAnalyseDate));
      setAllDataTracked(dataArray);
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
        <ChartBlock chartData={dataChartData} />
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
          <IconButton title={"Infos"} icon={infos} onClick={() => {}} />
        </div>
      </div>

      {shwoDetails && (
        <DataDetails
          port={port}
          startDate={startDate}
          dataTracked={allDataTracked}
        />
      )}
    </div>
  );
};
