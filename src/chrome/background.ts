import {
  clearCarbonAnalysis,
  headersReceivedListener,
} from "./modules/Analysis/Carbon.module";
import {
  clearTimeStorage,
  onTabTrack,
  processTabChanged,
} from "./modules/Analysis/TimeTracking.module";
import {
  browserColor
} from "./modules/Tools/Color.module";
import { dontDownloadImage } from "./modules/Tools/Download.module";
import { setBrowserOffline } from "./modules/Tools/Offline.module";
import {
  createNewTimeRule,
  DeleteTimeRule,
} from "./modules/Tools/TimeAlert.module";

// starts when you are on chrome window
chrome.windows.onFocusChanged.addListener(function (windowId: number) {
  // starts time tracking
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    processTabChanged(false);
  } else {
    processTabChanged(true);
  }
});

// update time tracking when you act on tabs
chrome.tabs.onActivated.addListener(function () {
  setBrowserOffline(false);
  onTabTrack();
});

chrome.tabs.onCreated.addListener(function () {});

chrome.tabs.onUpdated.addListener(function () {
  // check colors status
  browserColor(false);
  dontDownloadImage(false);
  setBrowserOffline(false);
});

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (request) {
    console.log("message recieved" + request);
    if (request === "setBlackAndWhite") {
      browserColor(true);
    }
    if (request === "ResetAnalysis") {
      clearTimeStorage();
      clearCarbonAnalysis();
    }
    if (request === "SetUnactiveTabsOffline") {
      setBrowserOffline(true);
    }
    if (request === "dontDownloadImage") {
      dontDownloadImage(true);
    }
    if (request.msg === "CreateNewTimeRule") {
      createNewTimeRule(request.domain, request.timeValue);
    }
    if (request.msg === "DeleteTimeRule") {
      DeleteTimeRule(request.domain);
    }
  });
});

chrome.webRequest.onCompleted.addListener(
  function (event: any) {
    headersReceivedListener(event);
  },
  { urls: ["https://*/*"] },
  ["responseHeaders"]
);
