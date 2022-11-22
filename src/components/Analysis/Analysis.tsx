import React, { useState } from "react";
import { ButtonIcon } from "../Shared/Buttons/ButtonIcon";
import { CategoryHeader } from "../Shared/categoryHeader";
import { AnalysisTypeEnum } from "../Shared/methods/enum";
import clock from "./../Assets/clock.png";
import lighting from "./../Assets/lighting.png";
import data from "./../Assets/data.png";
import { EnergyCarbonTracking } from "./EnergyCarbon/EnergyCarbon";
import { TimeTracking } from "./TimeTracking/TimeTracking";
import { DataTracking } from "./Data/Data";

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
              title={"Energy"}
              icon={lighting}
              onClick={() => setType(AnalysisTypeEnum.ENERGY)}
            />
          </div>
          {type === AnalysisTypeEnum.TIME && <TimeTracking port={port}/>}
          {type === AnalysisTypeEnum.DATA && <DataTracking port={port}/>}
          {type === AnalysisTypeEnum.ENERGY && <EnergyCarbonTracking port={port}/>}
        </div>
      )}
    </div>
  );
};
