export function dontDownloadImage() {
  chrome.storage.local.get("downloadStatut", (result) => {
    const isDownloadObject = result["downloadStatut"];
    const downloadStatus =
      isDownloadObject !== undefined ? JSON.parse(result["downloadStatut"]) : true;
    chrome.tabs.query({}, function (tabs) {
      let TabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            TabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async () => {
          if (!downloadStatus) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [2],
              });
              setDownloadStatus(true);
            } catch (err) {
              console.log("not available to go offline", err);
            }
          } else {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                addRules: [
                  {
                    id: 2,
                    action: {
                      type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
                    },
                    condition: {
                      resourceTypes: [
                        chrome.declarativeNetRequest.ResourceType.IMAGE,
                      ],
                      tabIds: TabsId,
                    },
                  },
                ],
                removeRuleIds: [2],
              });
              setDownloadStatus(false);
            } catch (err) {
              console.log("not available to go offline", err);
            }
          }
        });
      }
    });
  });
}

export function dontDownloadImageOnTabUpdate() {
  chrome.storage.local.get("downloadStatut", (result) => {
    const isDownloadObject = result["downloadStatut"];
    const downloadStatus =
      isDownloadObject !== undefined ? JSON.parse(result["downloadStatut"]) : true;
    chrome.tabs.query({}, function (tabs) {
      let TabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            TabsId.push(tab.id);
          }
        });
        console.log(TabsId);
        chrome.declarativeNetRequest.getSessionRules().then(async () => {
          if (downloadStatus) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [2],
              });
            } catch (err) {
              console.log("not available to go offline", err);
            }
          } else {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                addRules: [
                  {
                    id: 2,
                    action: {
                      type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
                    },
                    condition: {
                      resourceTypes: [
                        chrome.declarativeNetRequest.ResourceType.IMAGE,
                      ],
                      tabIds: TabsId,
                    },
                  },
                ],
                removeRuleIds: [2],
              });
            } catch (err) {
              console.log("not available to go offline", err);
            }
          }
        });
      }
    });
  });
}

// PRIVATE METHODS

const setDownloadStatus = (statut: boolean) => {
  let newStorageInfo: any = {};
  newStorageInfo["downloadStatut"] = JSON.stringify(statut);

  chrome.storage.local.set(newStorageInfo, function () {});
};
