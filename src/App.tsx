import React, { useEffect, useState } from "react";

import "./App.css";
import { Analysis } from "./components/Analysis/Analysis";
import { Comparison } from "./components/Comparison/Comparison";
import { Toolbox } from "./components/Toolbox/Toolbox/Toolbox";

function App() {
  const [url, setUrl] = useState<string>("");

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

  return (
    <div className="App">
       <header className="App-header">
        <p>URL:</p>
        <p>{url}</p>
      </header>
      <Analysis />
      <Toolbox />
      <Comparison />
    </div>
  );
}

export default App;
