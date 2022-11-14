import React, { useState } from "react";
import { ButtonIcon } from "../Shared/ButtonIcon";
import { CategoryHeader } from "../Shared/categoryHeader";
import { AnalysisTypeEnum } from "../Shared/methods/enum";
import clock from "./../Assets/clock.png";
import co2_cloud from "./../Assets/co2-cloud.png";
import lighting from "./../Assets/lighting.png";
import data from "./../Assets/data.png";
import { EnergyCarbonTracking } from "./EnergyCarbon/EnergyCarbon";
import { TimeTracking } from "./TimeTracking/TimeTracking";

interface AnalysisProps {
  port: chrome.runtime.Port;
}

export const Analysis = ({port}: AnalysisProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [type, setType] = useState<AnalysisTypeEnum>(AnalysisTypeEnum.TIME);
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
              onClick={() => setType(AnalysisTypeEnum.TIME)}
            />
            <ButtonIcon
              title={"Data"}
              icon={data}
              onClick={() => setType(AnalysisTypeEnum.DATA)}
            /> 
            <ButtonIcon
              title={"CO2"}
              icon={co2_cloud}
              onClick={() => setType(AnalysisTypeEnum.CARBON)}
            />
          </div>
          {type === AnalysisTypeEnum.TIME && <TimeTracking port={port}/>}
          {type !== AnalysisTypeEnum.TIME && <EnergyCarbonTracking port={port} dataType={type}/>}
        </div>
      )}
    </div>
  );
};
