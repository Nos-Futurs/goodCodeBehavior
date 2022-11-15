import React, { useState } from "react";
import { CategoryHeader } from "../Shared/categoryHeader";
import { Tools } from "./Tools";

interface ToolboxProps {
  port: chrome.runtime.Port;
}

export const Toolbox = ({ port }: ToolboxProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <div style={{ marginBottom: "10px" }}>
      <div
        style={{
          margin: "10px 0 10px 0",
        }}
      >
        <CategoryHeader
          title="Toolbox"
          dropDown={dropDown}
          setDropDown={setDropDown}
        />
      </div>
      {dropDown && <Tools port={port} />}
    </div>
  );
};
