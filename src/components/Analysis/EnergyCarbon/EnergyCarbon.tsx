import React, { useEffect, useState } from "react";
import { AnalysisTypeEnum } from "../../Shared/methods/enum";
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
    <div
      style={{
        flexDirection: "column",
        marginTop: "10px",
        marginBottom: "30px",
        display: "flex",
      }}
    >
      <div
        style={{
          margin: "10px",
          padding: "15px",
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          border: "solid",
          borderWidth: "2px",
          borderColor: "rgba(58, 112, 39, 1)",
          borderRadius: "10px",
        }}
      >
        <div>Energy used for data consumption</div>
        <div>Energy used for chrome usage</div>
        <div>Equivalent in CO2</div>
        <div>Comparison</div>
      </div>
    </div>
  );
};
