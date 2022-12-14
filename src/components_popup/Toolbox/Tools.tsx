import React, { useEffect, useState } from "react";
import { storageObject } from "../../chrome_background/modules/Shared.module";
import { useModalContext } from "../Modal/modalContext";
import { InfosEnum } from "../Shared/methods/enum";
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
  const { openModal } = useModalContext();

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get([
        "browserColorStatus",
        "offlineStatut",
        "downloadStatut",
      ]);
      const dataColorObject = storageObject(data["browserColorStatus"], {
        colorStatus: true,
      });
      const dataOffline = storageObject(data["offlineStatut"], false);
      const downloadStatut = storageObject(data["downloadStatut"], true);
      setImageDownloading(downloadStatut);
      setOffline(dataOffline);
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
    <div style={{ marginTop: "25px" }}>
      <ToggleSwitch
        label={"Set tabs in black and white"}
        status={!grey}
        onClick={() => {
          blackAndWhiteBackground();
          setGrey(!grey);
        }}
        onInfosClick={() => {
          openModal(InfosEnum.BLACK_WHITE_RULE);
        }}
      />
      <ToggleSwitch
        label={"Set non-active tabs offline"}
        status={offline}
        onClick={() => {
          onlineBackground();
          setOffline(!offline);
        }}
        onInfosClick={() => {
          openModal(InfosEnum.OFFLINE_RULE);
        }}
      />
      <ToggleSwitch
        label={"Avoid downloading images"}
        status={!imageDownloading}
        onClick={() => {
          dontDownloadImage();
          setImageDownloading(!imageDownloading);
        }}
        onInfosClick={() => {
          openModal(InfosEnum.DOWNLOAD_RULE);
        }}
      />
      <InputBox port={port} label={"Manage your time rules : "} url={url} />
    </div>
  );
};
