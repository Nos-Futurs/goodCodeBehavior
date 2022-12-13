import React, { useEffect, useState } from "react";
import { dataForAnalysis } from "../../../chrome_background/data/data";
import { storageObject } from "../../../chrome_background/modules/Shared.module";
import { useModalContext } from "../../Modal/modalContext";
import { InfosButton } from "../../Shared/Buttons/InfosButton";
import { InfosEnum } from "../../Shared/methods/enum";
import car from "./../../Assets/car.png";
import co2Cloud from "./../../Assets/co2-cloud.png";
import dataIcon from "./../../Assets/data.png";
import lightbulb from "./../../Assets/lightbulb.png";
import lighting from "./../../Assets/lighting.png";
import { ItemTracking } from "./Item";
import { energyAndCarbonFromBytes } from "../methods/carbonAnalysis.methods";

interface EnergyCarbonTrackingProps {
  port: chrome.runtime.Port;
}

export const EnergyCarbonTracking = ({ port }: EnergyCarbonTrackingProps) => {
  const [dataExchange, setDataExchange] = useState(0);
  const [time, setTime] = useState(0);
  const [energyEquivalent, setEnergyEquivalent] = useState(0);
  const [CO2Equivalent, setCO2Equivalent] = useState(0);
  const { openModal } = useModalContext();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "TabsData",
        "startingTimeAnalyseDate",
        "tabsTimeObject",
      ]);
      const dataObject = storageObject(data["TabsData"]);
      const timeObject = storageObject(data["tabsTimeObject"]);
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

  const gramCO2 =
    CO2Equivalent +
    ((dataForAnalysis.energy.kWhPerMinuteDevice * time) / 60) *
      dataForAnalysis.carbonIntensity.byRegion.carbonIntensityFactorIngCO2PerKWh
        .global;

  return (
    <div
      style={{
        marginTop: "10px",
        marginBottom: "40px",
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
          text={"Data exchanged:"}
          number={dataExchange / 1000000}
          icon={dataIcon}
          measures={"Mb"}
          toFixNumber={0}
        />
        <ItemTracking
          text={"Energy used:"}
          number={
            energyEquivalent +
            (dataForAnalysis.energy.kWhPerMinuteDevice * time) / 60
          }
          icon={lighting}
          measures={"kWh"}
        />
        <ItemTracking
          text={"Equivalent to:"}
          number={gramCO2}
          icon={co2Cloud}
          measures={"gCO2"}
          toFixNumber={0}
        />
        <div style={{ paddingTop: "20px" }}>
          <ItemTracking
            text={"Equivalent to a light bulb during"}
            number={Math.floor(
              (energyEquivalent +
                dataForAnalysis.energy.kWhPerMinuteDevice * time / 60) /
                (dataForAnalysis.examples.lightbulbPowerInWatt / 1000)
            )}
            icon={lightbulb}
            measures={"hours"}
            toFixNumber={0}
          />
          <ItemTracking
            text={"Car ride quivalence"}
            number={gramCO2 / dataForAnalysis.examples.gCO2_per_kmCar}
            icon={car}
            measures={"km"}
          />
        </div>
      </div>
      <div>
        <InfosButton onClick={() => openModal(InfosEnum.ENERGY_CARBON)} />
      </div>
    </div>
  );
};
