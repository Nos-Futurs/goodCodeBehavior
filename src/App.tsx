import React, { useEffect, useState } from "react";

import "./App.css";
import ToggleSwitch from "./components/ToggleSwitch/ToggleSwitch";

function App() {
  const [url, setUrl] = useState<string>("");
  const [responseFromContent, setResponseFromContent] = useState<string>("");
  const [grey, setGrey] = useState<boolean>(false);

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        if (url) {
          setUrl(url);
        }
      });
  }, []);

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
    <div className="App">
      <header className="App-header">
        <p>URL:</p>
        <p>{url}</p>
        <ToggleSwitch
          label={"Set black and white"}
          status={grey}
          onClick={() => {
            setBlackAndWhite(!grey);
            setGrey(!grey);
          }}
        />
      </header>
    </div>
  );
}

export default App;
