const tabsTime = "tabsTimeObject";
const lastActiveUrlDomain = "lastActivetab";

chrome.runtime.onInstalled.addListener(function () {
  /*  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {},
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      },
    ]);
  }); */
});

chrome.windows.onFocusChanged.addListener(function (windowId: number) {
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    processTabChanged(false);
  } else {
    processTabChanged(true);
  }
});

function getDomainName(url: string) {
  const httpRemoved = url.split("//")[1];
  const domainName = httpRemoved.split("/")[0];
  return domainName;
}


function processTabChanged(isChromeActive: boolean) {
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
        [tabsTime, lastActiveUrlDomain],
        function (result) {
          const lastActiveWebSite = result[lastActiveUrlDomain];
          const tabsTimeString = result[tabsTime];
          console.log('result', result);

          // get tabsTimeObject and lastActiveUrlDomain
          let tabTimeObject: any = {};
          if (tabsTimeString) {
            tabTimeObject = JSON.parse(tabsTimeString);
          }
          let lastActiveTab: any = {};
          if (lastActiveWebSite) {
            lastActiveTab = JSON.parse(lastActiveWebSite);
          }
          let currentDate = Date.now();

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
              } else { // we didn't track secondes for this url
                lastUrlObjectInfos["trackedSeconds"] = passedSeconds;
              }
              lastUrlObjectInfos["lastDateEval"] = currentDate;
            } else { // not register, create It 
              let newUrlInfo = {
                url: lastUrl,
                trackedSeconds: passedSeconds,
                lastDateEval: currentDate,
              };
              tabTimeObject[lastUrl] = newUrlInfo;
            }
          }

          let lastTabInfo: any = { url: domainName, lastDateEval: currentDate };
          if (!isChromeActive) { // we stop measuring time if chrome is not active
            lastTabInfo = {};
          }
          let newStorageInfo: any = {}
          newStorageInfo[lastActiveUrlDomain] = JSON.stringify(lastTabInfo);

          chrome.storage.local.set(newStorageInfo, function(){
            const tabsTimeString = JSON.stringify(tabTimeObject)
            let newTabTimeObject: any = {}
            newTabTimeObject[tabsTime] = tabsTimeString
            chrome.storage.local.set(newTabTimeObject, function(){})
          })
        }
      );
    }
  });
}

function onTabTrack(){
    processTabChanged(true)
}
chrome.tabs.onActivated.addListener(onTabTrack);
