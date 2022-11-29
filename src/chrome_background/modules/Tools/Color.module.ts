import { getDomainName, storageObject } from "../Shared.module";

export function browserColor(changeStatut: boolean = false) {
  // get current tab
  chrome.tabs.query({}, function (tabs) {
    if (tabs.length > 0) {
      // get storage to see color status
      chrome.storage.local.get(["browserColorStatus"], function (result) {
        const tabsColorStatusString = result["browserColorStatus"];
        // get tabsColorStatusObject if exists
        let tabsColorStatusObject = storageObject(tabsColorStatusString);

        // If tabsColorStatusObject exists and the domain already has a status defined then :
        if (
          tabsColorStatusObject &&
          tabsColorStatusObject["colorStatus"] !== undefined
        ) {
          const colorStatus = tabsColorStatusObject["colorStatus"];
          const setColorStatus = changeStatut ? colorStatus : !colorStatus;

          if (setColorStatus) {
            changeTabsToBW(tabs, true);
            tabsColorStatusObject["colorStatus"] = false;
          } else {
            changeTabsToBW(tabs, false);
            tabsColorStatusObject["colorStatus"] = true;
          }
        } else if (changeStatut) {
          changeTabsToBW(tabs, true);
          tabsColorStatusObject["colorStatus"] = false;
        }
        // update local storage
        if (changeStatut) {
          let newStorageInfos: any = {};
          newStorageInfos["browserColorStatus"] = JSON.stringify(
            tabsColorStatusObject
          );
          chrome.storage.local.set(newStorageInfos);
        }
      });
    }
  });
}

// PRIVATE FUNCTIONS

function changeTabsToBW(tabs: chrome.tabs.Tab[], toBlackAndWhite: boolean) {
  for (let index = 0; index < tabs.length; index++) {
    let tabIndexId = tabs[index].id;
    let url = tabs[index].url;
    if (tabIndexId) {
      if (url && getDomainName(url).includes("google.com")) {
        if (toBlackAndWhite) {
          chrome.scripting.insertCSS({
            target: { tabId: tabIndexId },
            css: "body { filter: grayscale(100%); }",
          });
        } else {
          try {
            chrome.scripting.removeCSS({
              target: {
                tabId: tabIndexId,
              },
              css: "body { filter: grayscale(100%); }",
            });
          } catch (err) {
            console.error(`failed to remove CSS: ${err}`);
          }
        }
      } else {
        if (toBlackAndWhite) {
          chrome.scripting.insertCSS({
            target: { tabId: tabIndexId },
            css: "html { filter: grayscale(100%); }",
          });
        } else {
          try {
            chrome.scripting.removeCSS({
              target: {
                tabId: tabIndexId,
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
}
