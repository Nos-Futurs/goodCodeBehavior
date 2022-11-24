import React, { useEffect, useState } from "react";
import { dataForAnalysis } from "../../../chrome_background/data/data";
import co2Cloud from "./../../Assets/co2-cloud.png";
import dataIcon from "./../../Assets/data.png";
import lightbulb from "./../../Assets/lightbulb.png";
import lighting from "./../../Assets/lighting.png";
import { ItemTracking } from "./Item";
import { energyAndCarbonFromBytes } from "./methods/carbonAnalysis.methods";

interface EnergyCarbonTrackingProps {
  port: chrome.runtime.Port;
}

export const EnergyCarbonTracking = ({ port }: EnergyCarbonTrackingProps) => {
  const [dataExchange, setDataExchange] = useState(0);
  const [time, setTime] = useState(0);
  const [energyEquivalent, setEnergyEquivalent] = useState(0);
  const [CO2Equivalent, setCO2Equivalent] = useState(0);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "TabsData",
        "startingTimeAnalyseDate",
        "tabsTimeObject",
      ]);
      const dataObject = JSON.parse(data["TabsData"]);
      const timeObject = JSON.parse(data["tabsTimeObject"]);
      const startingAnalyseDate = JSON.parse(data["startingTimeAnalyseDate"]);
      let activeTime = 0;
      for (let timeInfos in timeObject) {
        activeTime = activeTime + timeObject[timeInfos].trackedSeconds;
      }

      let dataBytes = 0;
      for (let carbonInfos in dataObject) {
        dataBytes = dataBytes + parseInt(dataObject[carbonInfos].bytes);
      }
      const energyAndCO2Equivalent = energyAndCarbonFromBytes(dataBytes);
      setTime(activeTime);
      setDataExchange(dataBytes);
      setEnergyEquivalent(energyAndCO2Equivalent.energy);
      setCO2Equivalent(energyAndCO2Equivalent.carbon);
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
        marginTop: "10px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          margin: "10px",
          padding: "15px 15px 0px 15px",
          flexDirection: "column",
          display: "flex",
          alignItems: "start",
          border: "solid",
          borderWidth: "2px",
          borderColor: "rgba(58, 112, 39, 1)",
          borderRadius: "10px",
        }}
      >
        <ItemTracking
          text={"Mb exchanged :"}
          number={dataExchange / 1000000}
          icon={dataIcon}
        />
        <ItemTracking
          text={"Energy in kWh :"}
          number={
            energyEquivalent + dataForAnalysis.energy.kWhPerMinuteDevice * time
          }
          icon={lighting}
        />
        <ItemTracking
          text={"gCO2 Equivalent :"}
          number={
            CO2Equivalent +
            dataForAnalysis.energy.kWhPerMinuteDevice *
              time *
              dataForAnalysis.carbonIntensity.byRegion
                .carbonIntensityFactorIngCO2PerKWh.defaultLocation
          }
          icon={co2Cloud}
        />
        <div style={{ paddingTop: "20px" }}>
          <ItemTracking
            text={"Equivalent to a light bulb during"}
            number={Math.floor(
              ((energyEquivalent +
                dataForAnalysis.energy.kWhPerMinuteDevice * time) /
                (dataForAnalysis.examples.lightbulbPowerInWatt / 1000))
            )}
            icon={lightbulb}
            measures={"hours"}
          />
        </div>
      </div>
    </div>
  );
};
