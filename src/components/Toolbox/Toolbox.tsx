import React, { useEffect, useState } from "react";
import { CategoryHeader } from "../Shared/categoryHeader";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

interface ToolboxProps {
  port: chrome.runtime.Port;
}

export const Toolbox = ({ port }: ToolboxProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [grey, setGrey] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);

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

  const blackAndWhiteBackground = () => {
    port.postMessage("setBlackAndWhite");
  };

  const onlineBackground = () => {
    port.postMessage("SetUnactiveTabsOffline");
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
        <div>
          <ToggleSwitch
            label={"Set black and white"}
            status={!grey}
            onClick={() => {
              blackAndWhiteBackground();
              setGrey(!grey);
            }}
          />
          <ToggleSwitch
            label={"Set non-active tabs offline"}
            status={offline}
            onClick={() => {
              onlineBackground();
              setOffline(!offline);
            }}
          />
        </div>
      )}
    </div>
  );
};
