export function dontDownloadImage() {
  chrome.storage.local.get("downloadStatut", (result) => {
    const isOfflineObject = JSON.parse(result["downloadStatut"]);
    const offlineStatut =
      isOfflineObject !== undefined ? isOfflineObject : false;
    chrome.tabs.query({}, function (tabs) {
      let NonActiveTabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            NonActiveTabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async (rules) => {
          if (rules.length > 0 && offlineStatut) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [1],
              });
              setDownloadStatus(false);
            } catch (err) {
              console.log("not available to go offline", err);
            }
          } else {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                addRules: [
                  {
                    id: 1,
                    action: {
                      type: chrome.declarativeNetRequest.RuleActionType.BLOCK,
                    },
                    condition: {
                      resourceTypes: [
                        chrome.declarativeNetRequest.ResourceType.IMAGE,
                      ],
                      tabIds: NonActiveTabsId,
                    },
                  },
                ],
                removeRuleIds: [1],
              });
              setDownloadStatus(true);
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
