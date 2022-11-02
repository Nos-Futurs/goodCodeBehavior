import React, { useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export const Toolbox = () => {
  const [grey, setGrey] = useState<boolean>(false);

  const setBlackAndWhite = (status: boolean) => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        if (currentTabId) {
          if (status){
            chrome.tabs.insertCSS(currentTabId, {
              code: "body { filter: grayscale(100%); }",
              allFrames: true,
            });
          } else if (!status) {
            chrome.tabs.insertCSS(currentTabId, {
              code: "body { filter: grayscale(0); }",
              allFrames: true,
            });
          }
        }
      });
  };
  
  return (
    <div>
      <div>Toolbox</div>
      <ToggleSwitch
        label={"Set black and white"}
        status={grey}
        onClick={() => {
          setBlackAndWhite(!grey);
          setGrey(!grey);
        }}
      />
    </div>
  );
};
