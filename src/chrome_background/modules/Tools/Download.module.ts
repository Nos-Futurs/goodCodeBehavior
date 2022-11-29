import { storageObject } from "../Shared.module";

export function dontDownloadImage(changeStatut: boolean = false) {
  chrome.storage.local.get("downloadStatut", (result) => {
    const isDownloadObject = result["downloadStatut"];
    const downloadStatus = storageObject(isDownloadObject, true)
    
    // If a change status is passed, this means that we should update the current rule.
    // Therefore, if the current status is true, we need to update the rule to false and then to register it in local storage.
    // on the contrary, when we open a new tab we want the current rule to be passed to this tab without changing local storage.
    const setDownload = changeStatut ? !downloadStatus : downloadStatus;

    chrome.tabs.query({}, function (tabs) {
      let TabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            TabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async () => {
          if (setDownload) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [2],
              });
              setDownloadStatus(changeStatut, true);
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
              setDownloadStatus(changeStatut, false);
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

const setDownloadStatus = (changeStatut: boolean, statut: boolean) => {
  if (changeStatut) {
    let newStorageInfo: any = {};
    newStorageInfo["downloadStatut"] = JSON.stringify(statut);

    chrome.storage.local.set(newStorageInfo, function () {});
  }
};
