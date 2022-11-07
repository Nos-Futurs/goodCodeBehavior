import { getDomainName } from "./Shared";

// Use local storage to manage black and white mode
export function changeColor() {
  // get current tab
  chrome.tabs.query({ active: true }, function (tabs) {
    if (tabs.length > 0 && tabs[0] !== null) {
      const currentTab = tabs[0];
      const url = currentTab.url;
      let domainName: string;
      if (url) {
        domainName = getDomainName(url);
      } else {
        throw new Error("url not found");
      }
      // get storage to see domain color status
      chrome.storage.local.get(["tabsColorStatus"], function (result) {
        const tabsColorStatusString = result["tabsColorStatus"];
        // get tabsColorStatusObject if exists
        let tabsColorStatusObject: any = {};
        if (tabsColorStatusString) {
          tabsColorStatusObject = JSON.parse(tabsColorStatusString);
        }

        // If tabsColorStatusObject exists and the domain already has a status defined then :
        if (
          tabsColorStatusObject &&
          tabsColorStatusObject[domainName] !== undefined
        ) {
          const colorStatus = tabsColorStatusObject[domainName];
          if (colorStatus) {
            // if colors are on, set page to black and white
            const currentTabId = currentTab.id;
            if (currentTabId) {
              chrome.scripting.insertCSS({
                target: { tabId: currentTabId, allFrames: true },
                css: "body { filter: grayscale(100%); }",
              });
            }
            // then update color status
            tabsColorStatusObject[domainName] = false;
          } else {
            // if colors are off, set page to color
            const currentTabId = currentTab.id;
            if (currentTabId) {
              chrome.scripting.insertCSS({
                target: { tabId: currentTabId, allFrames: true },
                css: "body { filter: grayscale(0%); }",
              });
            }
            // then update color status
            tabsColorStatusObject[domainName] = true;
          }
        } else {
          //either no local storage or no domain
          const currentTabId = currentTab.id;
          if (currentTabId) {
            chrome.scripting.insertCSS({
              target: { tabId: currentTabId, allFrames: true },
              css: "body { filter: grayscale(100%); }",
            });
          }
          // then update color status
          tabsColorStatusObject[domainName] = false;
        }
        // update local storage
        let newStorageInfos: any = {};
        newStorageInfos["tabsColorStatus"] = JSON.stringify(
          tabsColorStatusObject
        );
        chrome.storage.local.set(newStorageInfos);
      });
    }
  });
}

// check every time you open a tab if you've already decided the color status
export function checkColor() {
  // get current tab
  chrome.tabs.query({ active: true }, function (tabs) {
    if (tabs.length > 0 && tabs[0] !== null) {
      const currentTab = tabs[0];
      const url = currentTab.url;
      let domainName: string;
      if (url) {
        domainName = getDomainName(url);
      } else {
        throw new Error("url not found");
      }
      // get storage to see domain color status
      chrome.storage.local.get(["tabsColorStatus"], function (result) {
        const tabsColorStatusString = result["tabsColorStatus"];
        // get tabsColorStatusObject if exists
        let tabsColorStatusObject: any = {};
        if (tabsColorStatusString) {
          tabsColorStatusObject = JSON.parse(tabsColorStatusString);
        }

        // If tabsColorStatusObject exists and the domain already has a status defined then :
        if (
          tabsColorStatusObject &&
          tabsColorStatusObject[domainName] !== undefined
        ) {
          if (tabsColorStatusObject[domainName]) {
            // if colors are on, set page to black and white
            const currentTabId = currentTab.id;
            if (currentTabId) {
              chrome.scripting.insertCSS({
                target: { tabId: currentTabId, allFrames: true },
                css: "body { filter: grayscale(0%); }",
              });
            }
          } else {
            // if colors are off, set page to color
            const currentTabId = currentTab.id;
            if (currentTabId) {
              chrome.scripting.insertCSS({
                target: { tabId: currentTabId, allFrames: true },
                css: "body { filter: grayscale(100%); }",
              });
            }
          }
        }
      });
    }
  });
}
