import React, { useEffect, useState } from "react";
import { storageObject } from "../../../chrome_background/modules/Shared.module";
import { SimpleModal } from "../../Modal/Modal";
import { useModalContext } from "../../Modal/modalContext";
import { IconButton } from "../../Shared/Buttons/IconButton";
import { InfosButton } from "../../Shared/Buttons/InfosButton";
import { ChartBlock } from "../../Shared/PieChart/ChartBlock";
import details from "./../../Assets/details.png";
import { DataDetails } from "./DataDetails";
import { DataInfos } from "./DataInfos";
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
  const { openModal } = useModalContext();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "TabsData",
        "startingTimeAnalyseDate",
      ]);
      const dataObject = storageObject(data["TabsData"]);
      const startingAnalyseDate = storageObject(
        data["startingTimeAnalyseDate"]
      );
      let dataArray = [];
      for (let dataINfo in dataObject) {
        dataArray.push({
          domain: dataINfo,
          bytes: parseInt(dataObject[dataINfo].bytes),
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
          <div>
            <InfosButton onClick={() => openModal()} />
            <SimpleModal>
              <DataInfos />
            </SimpleModal>
          </div>
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
