import { storageObject } from "../Shared.module";

/**
 * Set or remove rules for non active tabs
 * @param changeStatut 
 */
export function setBrowserOffline(changeStatut: boolean = false) {
  const data = chrome.storage.local.get("offlineStatut", (result) => {
    const offlineStatut = storageObject(result["offlineStatut"], false);

    // If a change status is passed, this means that we should update the current rule.
    // Therefore, if the current status is true, we need to update the rule to false and then to register it in local storage.
    // on the contrary, when we open a new or update a tab we want the current rule to be passed to this tab without changing local storage.
    const setOffline = changeStatut ? offlineStatut : !offlineStatut;

    chrome.tabs.query({ active: false }, function (tabs) {
      let NonActiveTabsId: number[] = [];
      if (tabs.length > 0) {
        tabs.map((tab) => {
          if (tab.id) {
            NonActiveTabsId.push(tab.id);
          }
        });
        chrome.declarativeNetRequest.getSessionRules().then(async (rules) => {
          if (setOffline) {
            try {
              chrome.declarativeNetRequest.updateSessionRules({
                removeRuleIds: [1],
              });
              setOfflineStatus(changeStatut, false);
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
              setOfflineStatus(changeStatut, true);
            } catch (err) {
              console.log("not available to go offline", err);
            }
          }
        });
      }
    });
  });
}


/* -------------------------------------------------------------------------- */
/*                               PRIVATE METHODS                              */
/* -------------------------------------------------------------------------- */

/**
 * Update local storage to keep track of active rules
 * @param changeStatut 
 * @param statut 
 */
const setOfflineStatus = (changeStatut: boolean, statut: boolean) => {
  if (changeStatut) {
    let newStorageInfo: any = {};
    newStorageInfo["offlineStatut"] = JSON.stringify(statut);

    chrome.storage.local.set(newStorageInfo, function () {});
  }
};
