import React, { useEffect, useState } from "react";
import { energyAndCarbonFromBytes } from "../Analysis/EnergyCarbon/methods/carbonAnalysis.methods";
import { formatItemTime } from "../Analysis/TimeTracking/Time.methods";
import clock from "./../Assets/clock.png";
import lighting from "./../Assets/lighting.png";

interface SummaryProps {}

export const Summary = ({}: SummaryProps) => {
  const [timeActive, setTimeActive] = useState<number>(0);
  const [usedEnergy, setUsedEnergy] = useState<number>(0);
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "tabsTimeObject",
        "TabsCarbon",
        "startingTimeAnalyseDate",
      ]);
      const dataTimeObject = JSON.parse(data["tabsTimeObject"]);
      const dataCarbonObject = JSON.parse(data["TabsCarbon"]);
      //const startingAnalyseDate = JSON.parse(data["startingTimeAnalyseDate"]);
      let activeTime = 0;
      for (let timeInfos in dataTimeObject) {
        activeTime = activeTime + dataTimeObject[timeInfos].trackedSeconds;
      }
      let energyUsed = 0;
      for (let carbonInfos in dataCarbonObject) {
        const EnergyAndCarbon = energyAndCarbonFromBytes(
          dataCarbonObject[carbonInfos]
        );
        energyUsed = energyUsed + EnergyAndCarbon["energy"]
      }
      setTimeActive(activeTime);
      setUsedEnergy(energyUsed);
    };
    // call the function
    fetchData();
  }, []);

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "40px",
        justifyContent: "center",
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "130px",
          border: "3px solid",
          borderRadius: "10px",
          borderColor: "rgba(58, 112, 39, 1)",
          flexDirection: "column",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            borderBottom: "3px solid",
            paddingTop: "8px",
            paddingBottom: "8px",
            fontSize: "20px",
            fontWeight: "bold",
            borderBottomColor: "rgba(58, 112, 39, 1)",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Session usage
        </div>
        <div style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
          <img src={clock} style={{ width: "30px", margin: "6px" }} />
          <div style={{paddingLeft: "15px", fontSize: "15px"}}>{formatItemTime(timeActive)}</div>
        </div>

        <div style={{display: "flex", flexDirection: "row", alignItems:"center"}}>
          <img src={lighting} style={{ width: "30px", margin: "6px" }} />
          <div style={{paddingLeft: "15px", fontSize: "15px"}}>{usedEnergy.toString() + " kWh"}</div>
        </div>
      </div>
    </div>
  );
};
