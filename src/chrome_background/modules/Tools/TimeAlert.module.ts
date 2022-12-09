import { storageObject } from "../Shared.module";

const timeRules = "timeRulesObject";
const lastActiveUrlDomain = "lastActivetab";
const tabsTime = "tabsTimeObject";


/**
 * Create new time rule, first set it in local storage 
 * then create alarm every minute to check the status of the time rule
 * 
 * @param domain 
 * @param time 
 * @param nextWarning 
 */
export function createNewTimeRule(
  domain: string,
  time: number,
  nextWarning: number = 0
) {
  chrome.storage.local.get([timeRules], function (result) {
    const timeRulesJSON = result[timeRules];
    let timeRulesObject = storageObject(timeRulesJSON);
    timeRulesObject[domain] = { domain, time, nextWarning };

    const rulesTimeString = JSON.stringify(timeRulesObject);
    let newTabTimeObject: any = {};
    newTabTimeObject[timeRules] = rulesTimeString;
    chrome.storage.local.set(newTabTimeObject, function () {});
  });
  createTimeAlarm();
}

/**
 * Delete time rule in local storage
 * 
 * @param domain 
 */
export function DeleteTimeRule(domain: string) {
  chrome.storage.local.get([timeRules], function (result) {
    const timeRulesJSON = result[timeRules];
    let timeRulesObject = storageObject(timeRulesJSON);
    if (timeRulesObject[domain]) {
      delete timeRulesObject[domain];
      const rulesTimeString = JSON.stringify(timeRulesObject);
      let newTabTimeObject: any = {};
      newTabTimeObject[timeRules] = rulesTimeString;
      chrome.storage.local.set(newTabTimeObject, function () {});
    }
  });
}

/**
 * Every time an alarm occurs we check the rules and send a notification if necessary
 */
export const notificationSending = () => {
  chrome.storage.local.get(
    [timeRules, lastActiveUrlDomain, tabsTime],
    function (result) {
      const timeRulesJSON = result[timeRules];
      const lastActiveTabJSON = result[lastActiveUrlDomain];
      const tabsTimeJSON = result[tabsTime];

      if (
        // If no time rules defined, then clear alarms
        timeRulesJSON === undefined ||
        JSON.stringify(timeRulesJSON) === "{}"
      ) {
        chrome.alarms.clearAll();
      } else {
        // If Time rules are defined
        const timeRulesObject = JSON.parse(timeRulesJSON);

        if (
          // if time tracking is working
          lastActiveTabJSON !== undefined &&
          JSON.stringify(lastActiveTabJSON) !== "{}" &&
          tabsTimeJSON !== undefined &&
          JSON.stringify(tabsTimeJSON) !== "{}"
        ) {
          const tabTimeObject = JSON.parse(tabsTimeJSON);
          const lastActiveTabObject = JSON.parse(lastActiveTabJSON);
          for (let domain in timeRulesObject) {
            if (lastActiveTabObject.url === domain) {
              let timingRule =
                timeRulesObject[domain].nextWarning &&
                timeRulesObject[domain].nextWarning !== 0
                  ? timeRulesObject[domain].nextWarning
                  : timeRulesObject[domain].time;
              let initialTime = 0;
              if (tabTimeObject[domain]) {
                initialTime = tabTimeObject[domain].trackedSeconds;
              }
              const timePassedInMinutes =
                (initialTime +
                  (Date.now() - lastActiveTabObject.lastDateEval) / 1000) /
                60;
              if (timePassedInMinutes > timingRule) {
                chrome.notifications.create({
                  type: "basic",
                  iconUrl: chrome.runtime.getURL("images/logo.png"),
                  title: "Time warning !",
                  message: `You have exceeded your time rule on ${domain}`,
                });
                createNewTimeRule(
                  domain,
                  timeRulesObject[domain].time,
                  timePassedInMinutes + timeRulesObject[domain].time
                );
              }
            }
          }
        }
      }
    }
  );
};


/* -------------------------------------------------------------------------- */
/*                               PRIVATE METHODS                              */
/* -------------------------------------------------------------------------- */

/**
 * create time alarm every minute to check rules status
 */
const createTimeAlarm = () => {
  chrome.alarms.getAll(function (result) {
    if (result.length === 0) {
      chrome.alarms.create("timeNotification", {
        delayInMinutes: 1,
        periodInMinutes: 1,
      });
    }
  });
};
