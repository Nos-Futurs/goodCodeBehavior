import { getDomainName } from "../Shared.module";

const tabsTime = "tabsTimeObject";
const lastActiveUrlDomain = "lastActivetab";
const startingTimeAnalyseDate = "startingTimeAnalyseDate";

// Use local storage to calculate the time you (actively) spend on each webSite
export function processTabChanged(isChromeActive: boolean) {
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
      chrome.storage.local.get(
        [tabsTime, lastActiveUrlDomain, startingTimeAnalyseDate],
        function (result) {
          const lastActiveWebSite = result[lastActiveUrlDomain];
          const tabsTimeString = result[tabsTime];
          const startingDate = result[startingTimeAnalyseDate];
          // get tabsTimeObject and lastActiveUrlDomain
          let tabTimeObject: any = {};
          if (JSON.stringify(tabsTimeString) !== "{}") {
            tabTimeObject = JSON.parse(tabsTimeString);
          }
          let lastActiveTab: any = {};
          if (JSON.stringify(lastActiveWebSite) !== "{}") {
            lastActiveTab = JSON.parse(lastActiveWebSite);
          }
          let currentDate = Date.now();
          let startingDateAnalysis: number =
            startingDate !== null
              ? parseInt(JSON.parse(startingDate))
              : currentDate;

          // If there is a last active url in storage
          if (
            lastActiveTab &&
            lastActiveTab.hasOwnProperty("url") &&
            lastActiveTab.hasOwnProperty("lastDateEval")
          ) {
            const lastUrl = lastActiveTab["url"];
            let passedSeconds =
              (currentDate - lastActiveTab["lastDateEval"]) / 1000;

            // If this lastUrl is register un tabsTimeObject (normally there is)
            if (tabTimeObject.hasOwnProperty(lastUrl)) {
              let lastUrlObjectInfos = tabTimeObject[lastUrl];
              // If we already tracked secondes for this website
              if (lastUrlObjectInfos.hasOwnProperty("trackedSeconds")) {
                lastUrlObjectInfos["trackedSeconds"] =
                  lastUrlObjectInfos["trackedSeconds"] + passedSeconds;
              } else {
                // we didn't track secondes for this url
                lastUrlObjectInfos["trackedSeconds"] = passedSeconds;
              }
              lastUrlObjectInfos["lastDateEval"] = currentDate;
            } else {
              // not register, create It
              let newUrlInfo = {
                url: lastUrl,
                trackedSeconds: passedSeconds,
                lastDateEval: currentDate,
              };
              tabTimeObject[lastUrl] = newUrlInfo;
            }
          }

          let lastTabInfo: any = { url: domainName, lastDateEval: currentDate };
          if (!isChromeActive) {
            // we stop measuring time if chrome is not active
            lastTabInfo = {};
          }
          let newStorageInfo: any = {};
          newStorageInfo[lastActiveUrlDomain] = JSON.stringify(lastTabInfo);

          chrome.storage.local.set(newStorageInfo, function () {
            const tabsTimeString = JSON.stringify(tabTimeObject);
            const startingDateString = JSON.stringify(startingDateAnalysis);
            let newTabTimeObject: any = {};
            newTabTimeObject[tabsTime] = tabsTimeString;
            newTabTimeObject[startingTimeAnalyseDate] = startingDateString;
            chrome.storage.local.set(newTabTimeObject, function () {});
          });
        }
      );
    }
  });
}

export function onTabTrack() {
  processTabChanged(true);
}

export function clearTimeStorage() {
  let newStorageInfo: any = {};
  newStorageInfo[tabsTime] = {};
  newStorageInfo[lastActiveUrlDomain] = {};
  newStorageInfo[startingTimeAnalyseDate] = null;
  chrome.storage.local.set(newStorageInfo, function () {});
}
