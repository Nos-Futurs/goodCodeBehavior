import React, { useEffect, useState } from "react";
import InputBox from "./InputChoice/InputBox";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

interface ToolsProps {
  port: chrome.runtime.Port;
}

export const Tools = ({ port }: ToolsProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [imageDownloading, setImageDownloading] = useState<boolean>(false);
  const [grey, setGrey] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "browserColorStatus",
        "offlineStatut",
      ]);
      const dataColorObject = JSON.parse(data["browserColorStatus"]);
      const dataOfflineObject = JSON.parse(data["offlineStatut"]);
      setOffline(dataOfflineObject);
      setGrey(dataColorObject["colorStatus"]);
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

  const dontDownloadImage = () => {
    port.postMessage("dontDownloadImage");
  };

  return (
    <div style={{ marginTop: "15px" }}>
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
      <ToggleSwitch
        label={"Don't download image"}
        status={imageDownloading}
        onClick={() => {
          dontDownloadImage();
          setImageDownloading(!imageDownloading);
        }}
      />
      <InputBox label={"Manage your time rules : "} url={"test.com"} />
    </div>
  );
};
