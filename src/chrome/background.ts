import {
  clearCarbonAnalysis,
  headersReceivedListener,
} from "./modules/Carbon.module";
import { changeBrowserColor, checkBrowserColor } from "./modules/Color.module";
import {
  clearTimeStorage,
  onTabTrack,
  processTabChanged,
} from "./modules/TimeTracking.module";

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
  onTabTrack;
});

chrome.tabs.onCreated.addListener(function () {});

chrome.tabs.onUpdated.addListener(function () {
  // check colors status
  checkBrowserColor();
});

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
    if (msg === "setBlackAndWhite") {
      changeBrowserColor();
    }
    if (msg === "ResetAnalysis") {
      clearTimeStorage();
      clearCarbonAnalysis();
      chrome.storage.local.get(function (result) {
        console.log(result);
      });
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
