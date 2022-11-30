import React, { useEffect, useState } from "react";
import { getDomainName } from "../../chrome_background/modules/Shared.module";
import { CategoryHeader } from "../Shared/categoryHeader";
import { Tools } from "./Tools";

interface ToolboxProps {
  port: chrome.runtime.Port;
}

export const Toolbox = ({ port }: ToolboxProps) => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");

  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url;
        if (url && url.slice(0, 19) !== "chrome-extension://") {
          const domainUrl = getDomainName(url)
          setUrl(domainUrl);
        }
      });
  }, []);

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
      {dropDown && <Tools port={port} url={url} />}
    </div>
  );
};
