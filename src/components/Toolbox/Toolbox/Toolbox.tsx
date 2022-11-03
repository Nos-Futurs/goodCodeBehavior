import React, { useState } from "react";
import { CategoryHeader } from "../../shared/categoryHeader";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export const Toolbox = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
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
          if (status) {
            chrome.scripting.insertCSS({ target: { tabId: currentTabId, allFrames: true }, css: "body { filter: grayscale(100%); }" })
          } else if (!status) {
            chrome.scripting.insertCSS({ target: { tabId: currentTabId, allFrames: true }, css: "body { filter: grayscale(100%); }" })
          }
        }
      });
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
