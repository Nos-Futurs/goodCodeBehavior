import React, { useState } from "react";
import { CategoryHeader } from "../shared/categoryHeader";

export const Comparison = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  return (
    <div
      style={{
        margin: "10px 0 10px 0",
      }}
    >
      <CategoryHeader
        title="Comparison"
        dropDown={dropDown}
        setDropDown={setDropDown}
      />
      {dropDown && <div>This is where we should put our analysis</div>}
    </div>
  );
};
