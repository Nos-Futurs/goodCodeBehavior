import { changeColor, checkColor } from "./modules/Color.module";
import { onTabTrack, processTabChanged } from "./modules/TimeTracking.module";

// starts when you are on chrome window
chrome.windows.onFocusChanged.addListener(function (windowId: number) {
  // starts time tracking 
  if (windowId === chrome.windows.WINDOW_ID_NONE) {
    processTabChanged(false);
  } else {
    processTabChanged(true);
  }
  // check and adapt colorsStatus
  checkColor()
});

// update time tracking when you act on tabs
chrome.tabs.onActivated.addListener(onTabTrack);

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    console.log("message recieved" + msg);
    if (msg === "setBlackAndWhite"){
      changeColor()
    }
  });
});
