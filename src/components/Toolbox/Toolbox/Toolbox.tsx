import React, { useEffect, useState } from "react";
import { CategoryHeader } from "../../Shared/categoryHeader";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

interface ToolboxProps {
  port: chrome.runtime.Port;
}

export const Toolbox = ({ port }: ToolboxProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [grey, setGrey] = useState<boolean>(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get("browserColorStatus");
      const dataObject = JSON.parse(data["browserColorStatus"]);
      setGrey(dataObject["colorStatus"]);
    };
    // call the function
    fetchData();
  }, []);

  const setBlackAndWhite = (status: boolean) => {
    port.postMessage("setBlackAndWhite");
  };

  return (
    <div>
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
      {dropDown && (
        <ToggleSwitch
          label={"Set black and white"}
          status={grey}
          onClick={() => {
            setBlackAndWhite(!grey);
            setGrey(!grey);
          }}
        />
      )}
    </div>
  );
};
