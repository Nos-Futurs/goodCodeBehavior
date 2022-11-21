import { getDomainName } from "../Shared.module";

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

export function checkBrowserColor() {
  // get current tab
  chrome.tabs.query({}, function (tabs) {
    if (tabs.length > 0) {
      // get storage to see domain color status
      chrome.storage.local.get(["browserColorStatus"], function (result) {
        const tabsColorStatusString = result["browserColorStatus"];

        // get tabsColorStatusObject if exists
        let tabsColorStatusObject: any = {};
        if (tabsColorStatusString) {
          tabsColorStatusObject = JSON.parse(tabsColorStatusString);
        }

        // If tabsColorStatusObject exists and the domain already has a status defined then :
        if (
          tabsColorStatusObject &&
          tabsColorStatusObject["colorStatus"] !== undefined
        ) {
          if (tabsColorStatusObject["colorStatus"]) {
            // if colors are on, set page to black and white
            changeTabsToBW(tabs, false);
          } else {
            changeTabsToBW(tabs, true);
          }
        }
      });
    }
  });
}

export function changeBrowserColor() {
  // get current tab
  chrome.tabs.query({}, function (tabs) {
    if (tabs.length > 0) {
      // get storage to see color status
      chrome.storage.local.get(["browserColorStatus"], function (result) {
        const tabsColorStatusString = result["browserColorStatus"];
        // get tabsColorStatusObject if exists
        let tabsColorStatusObject: any = {};
        if (tabsColorStatusString) {
          tabsColorStatusObject = JSON.parse(tabsColorStatusString);
        }

        // If tabsColorStatusObject exists and the domain already has a status defined then :
        if (
          tabsColorStatusObject &&
          tabsColorStatusObject["colorStatus"] !== undefined
        ) {
          const colorStatus = tabsColorStatusObject["colorStatus"];
          if (colorStatus) {
            changeTabsToBW(tabs, true);
            tabsColorStatusObject["colorStatus"] = false;
          } else {
            changeTabsToBW(tabs, false);
            tabsColorStatusObject["colorStatus"] = true;
          }
        } else {
          changeTabsToBW(tabs, true);
          tabsColorStatusObject["colorStatus"] = false;
        }
        // update local storage
        let newStorageInfos: any = {};
        newStorageInfos["browserColorStatus"] = JSON.stringify(
          tabsColorStatusObject
        );
        chrome.storage.local.set(newStorageInfos);
      });
    }
  });
}

// PRIVATE FUNCTIONS

function changeTabsToBW(tabs: chrome.tabs.Tab[], toBlackAndWhite: boolean) {
  for (let index = 0; index < tabs.length; index++) {
    let tabIndexId = tabs[index].id;
    if (tabIndexId) {
      if (toBlackAndWhite) {
        chrome.scripting.insertCSS({
          target: { tabId: tabIndexId },
          css: "html { filter: grayscale(100%); }",
        });
      } else {
        try {
          chrome.scripting.removeCSS({
            target: {
              tabId: tabIndexId 
            },
            css: "html { filter: grayscale(100%); }",
          });
        } catch (err) {
          console.error(`failed to remove CSS: ${err}`);
        }
      }
    }
  }
}
