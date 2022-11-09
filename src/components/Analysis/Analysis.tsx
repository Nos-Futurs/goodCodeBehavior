import React, { useState } from "react";
import { ButtonIcon } from "../Shared/ButtonIcon";
import { CategoryHeader } from "../Shared/categoryHeader";
import clock from "./../Assets/clock.png";
import co2_cloud from "./../Assets/co2-cloud.png";
import lighting from "./../Assets/lighting.png";
import { TimeTracking } from "./TimeTracking/TimeTracking";

interface AnalysisProps {
  port: chrome.runtime.Port;
}

export const Analysis = ({port}: AnalysisProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [type, setType] = useState<String>("Time");
  return (
    <div
      style={{
        margin: "10px 0 10px 0",
      }}
    >
      <CategoryHeader
        title="Analysis"
        dropDown={dropDown}
        setDropDown={setDropDown}
      />
      {dropDown && (
        <div>
          <div
            style={{
              margin: "15px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <ButtonIcon
              title={"Time"}
              icon={clock}
              onClick={() => setType("Time")}
            />
            <ButtonIcon
              title={"Energy"}
              icon={lighting}
              onClick={() => setType("Energy")}
            />
            <ButtonIcon
              title={"CO2"}
              icon={co2_cloud}
              onClick={() => setType("CO2")}
            />
          </div>
          {type === "Time" && <TimeTracking port={port}/>}
          {type === "Energy" && <></>}
          {type === "CO2" && <></>}
        </div>
      )}
    </div>
  );
};
