import React, { useState } from "react";
import { CategoryHeader } from "../Shared/categoryHeader";
import { TimeTracking } from "./TimeTracking/TimeTracking";

export const Analysis = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
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
      {dropDown && <TimeTracking/>}
    </div>
  );
};
