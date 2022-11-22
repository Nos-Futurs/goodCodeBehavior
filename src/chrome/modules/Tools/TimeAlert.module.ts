const timeRules = "timeRulesObject";

// Create new time rule
export function createNewTimeRule(domain: string, time: number) {
  chrome.storage.local.get([timeRules], function (result) {
    const timeRulesJSON = result[timeRules];
    console.log(timeRulesJSON);
    let timeRulesObject: any = {};
    if (timeRulesJSON !== undefined) {
      timeRulesObject = JSON.parse(timeRulesJSON);
    }
    timeRulesObject[domain] = { domain, time };

    const rulesTimeString = JSON.stringify(timeRulesObject);
    let newTabTimeObject: any = {};
    newTabTimeObject[timeRules] = rulesTimeString;
    chrome.storage.local.set(newTabTimeObject, function () {});
  });
  createAlarm()
}

// Delete time rule
export function DeleteTimeRule(domain: string) {
  chrome.storage.local.get([timeRules], function (result) {
    const timeRulesJSON = result[timeRules];
    console.log(timeRulesJSON);
    let timeRulesObject: any = {};
    if (timeRulesJSON !== undefined) {
      timeRulesObject = JSON.parse(timeRulesJSON);
    }
    if (timeRulesObject[domain]) {
      delete timeRulesObject[domain];
      const rulesTimeString = JSON.stringify(timeRulesObject);
      let newTabTimeObject: any = {};
      newTabTimeObject[timeRules] = rulesTimeString;
      chrome.storage.local.set(newTabTimeObject, function () {});
    }
  });
  createAlarm()
}

export const createAlarm = () => {
  chrome.notifications.create("1", {
    type: "basic",
    iconUrl: chrome.runtime.getURL("images/logo.png"),
    title: "Time for cake!",
    message: "Something something cake",
  });
};

// PRIVATE FUNCTIONS
const showTimeRules = () => {
  chrome.storage.local.get([timeRules], function (result) {
    console.log(result);
  });
};
