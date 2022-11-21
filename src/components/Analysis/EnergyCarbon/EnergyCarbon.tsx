import React, { useEffect, useState } from "react";
import { IconButton } from "../../Shared/Buttons/IconButton";
import { AnalysisTypeEnum } from "../../Shared/methods/enum";
import { ChartBlock } from "../../Shared/PieChart/ChartBlock";
import details from "./../../Assets/details.png";
import infos from "./../../Assets/infos.png";
import { CarbonDetails } from "./EnergyCarbonDetails";
import {
  carbonTrackingPercentage,
  energyAndCarbonFromBytes,
} from "./methods/carbonAnalysis.methods";

interface EnergyCarbonTrackingProps {
  port: chrome.runtime.Port;
  dataType: AnalysisTypeEnum;
}

export const EnergyCarbonTracking = ({
  port,
  dataType,
}: EnergyCarbonTrackingProps) => {
  const [allDataTracked, setAllDataTracked] = useState<any>([]);
  const [shwoDetails, setShwoDetails] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dataChartData, setDataChartData] = useState<
    { title: string; value: number; color: string }[]
  >([]);
  const [carbonChartData, setCarbonChartData] = useState<
    { title: string; value: number; color: string }[]
  >([]);
  const [energyChartData, setEnergyChartData] = useState<
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
      for (let carbonInfos in dataObject) {
        const EnergyAndCarbon = energyAndCarbonFromBytes(
          dataObject[carbonInfos]
        );
        dataArray.push({
          domain: carbonInfos,
          bytes: parseInt(dataObject[carbonInfos]),
          energy: EnergyAndCarbon["energy"],
          carbon: EnergyAndCarbon["carbon"],
        });
      }
      const percentageArray = carbonTrackingPercentage(dataArray);
      setDataChartData(percentageArray.data);
      setCarbonChartData(percentageArray.carbon);
      setEnergyChartData(percentageArray.energy);
      setStartDate(new Date(startingAnalyseDate));
      setAllDataTracked(dataArray);
    };
    // call the function
    fetchData();
  }, []);

  const eraseData = () => {
    port.postMessage("ResetDataAnalysis");
  };

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
        <ChartBlock
          chartData={
            dataType === AnalysisTypeEnum.ENERGY
              ? energyChartData
              : dataType === AnalysisTypeEnum.DATA
              ? dataChartData
              : carbonChartData
          }
        />
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
        <CarbonDetails
          port={port}
          startDate={startDate}
          dataTracked={allDataTracked}
        />
      )}
    </div>
  );
};
