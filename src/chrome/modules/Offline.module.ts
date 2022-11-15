export function setBrowserOffline() {
  // get current tab
  chrome.tabs.query({ active: false }, function (tabs) {
    let NonActiveTabsId: number[] = [];
    if (tabs.length > 0) {
      tabs.map((tab) => {
        if (tab.id) {
          NonActiveTabsId.push(tab.id);
        }
      });
      chrome.declarativeNetRequest.getSessionRules().then(async (rules) => {
        if (rules.length > 0) {
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
}
