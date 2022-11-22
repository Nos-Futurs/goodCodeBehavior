export function setBrowserOffline() {
  const data = chrome.storage.local.get("offlineStatut", (result) => {
    const isOfflineObject = JSON.parse(result["offlineStatut"]);
    const offlineStatut = isOfflineObject !== undefined ? isOfflineObject: false;
    chrome.tabs.query({ active: false }, function (tabs) {
      let NonActiveTabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            NonActiveTabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async (rules) => {
          if (offlineStatut) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [1],
              });
              setOfflineStatus(false);
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
                      tabIds: NonActiveTabsId,
                    },
                  },
                ],
                removeRuleIds: [1],
              });
              setOfflineStatus(true);
            } catch (err) {
              console.log("not available to go offline", err);
            }
          }
        });
      }
    });
  });
}

export function setBrowserOfflineOnTabUpdate() {
  const data = chrome.storage.local.get("offlineStatut", (result) => {
    const isOfflineObject = JSON.parse(result["offlineStatut"]);
    const offlineStatut = isOfflineObject !== undefined ? isOfflineObject: false;
    chrome.tabs.query({ active: false }, function (tabs) {
      let NonActiveTabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            NonActiveTabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async (rules) => {
          if (!offlineStatut) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [1],
              });
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
                      tabIds: NonActiveTabsId,
                    },
                  },
                ],
                removeRuleIds: [1],
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

const setOfflineStatus = (statut: boolean) => {
  let newStorageInfo: any = {};
  newStorageInfo["offlineStatut"] = JSON.stringify(statut);

  chrome.storage.local.set(newStorageInfo, function () {});
};
