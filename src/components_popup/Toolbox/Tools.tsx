import React, { useEffect, useState } from "react";
import InputBox from "./InputChoice/InputBox";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";

interface ToolsProps {
  port: chrome.runtime.Port;
  url: string;
}

export const Tools = ({ port, url }: ToolsProps) => {
  const [imageDownloading, setImageDownloading] = useState<boolean>(false);
  const [grey, setGrey] = useState<boolean>(false);
  const [offline, setOffline] = useState<boolean>(false);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "browserColorStatus",
        "offlineStatut",
        "downloadStatut"
      ]);
      const dataColorObject = JSON.parse(data["browserColorStatus"]);
      const dataOfflineObject = JSON.parse(data["offlineStatut"]);
      const downloadStatutObject = JSON.parse(data["downloadStatut"]);
      setImageDownloading(downloadStatutObject);
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
        label={"Set tabs in black and white"}
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
        label={"Avoid downloading images"}
        status={!imageDownloading}
        onClick={() => {
          dontDownloadImage();
          setImageDownloading(!imageDownloading);
        }}
      />
      <InputBox port={port} label={"Manage your time rules : "} url={url} />
    </div>
  );
};
