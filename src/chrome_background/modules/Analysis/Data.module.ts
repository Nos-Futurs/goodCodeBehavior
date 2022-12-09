import { getDomainName, storageObject } from "../Shared.module";

/**
 * Check if the request headers have a content-length value
 * If not, set this value to 0
 * @param details //information regarding the request
 */
export const headersReceivedListener = (details: any) => {
  if (details.initiator || details.url) {
    const url = !details.initiator ? details.url : details.initiator;
    if (url.slice(0, 19) !== "chrome-extension://") {
      const origin = getDomainName(url);
      const contentLengthFromResponse = details.responseHeaders.find(
        (element: any) => element.name.toLowerCase() === "content-length"
      );
      const contentLength = !contentLengthFromResponse
        ? { value: 0 }
        : contentLengthFromResponse;
      const requestSize = parseInt(contentLength.value, 10);
      setByteLengthPerOrigin(origin, requestSize);
    }
  }
};


/**
 * method to clear the local storage from all the information regarding the data exhanges
 */
export const clearCarbonAnalysis = () => {
  let newStorageInfo: any = {};
  newStorageInfo["TabsData"] = null;
  chrome.storage.local.set(newStorageInfo, function () {});
};



/* -------------------------------------------------------------------------- */
/*                               PRIVATE METHODS                              */
/* -------------------------------------------------------------------------- */

/**
 * Update or set data exchange value for a specified website
 * @param origin // origin url of requests
 * @param byteLength // byte length in bytes
 */
const setByteLengthPerOrigin = (origin: string, byteLength: number) => {
  chrome.storage.local.get(["TabsData"], function (result) {
    const tabsDataJSON = storageObject(result["TabsData"]);
    let bytePerOrigin = 0;
    let numberOfRequestsPerOrigin = 0;
    if (undefined !== tabsDataJSON[origin]) {
      bytePerOrigin = parseInt(tabsDataJSON[origin].bytes);
      numberOfRequestsPerOrigin = parseInt(
        tabsDataJSON[origin].numberOfRequests
      );
    }
    tabsDataJSON[origin] = {
      bytes: bytePerOrigin + byteLength,
      numberOfRequests: numberOfRequestsPerOrigin + 1,
    };
    let newStorageInfo: any = {};
    newStorageInfo["TabsData"] = JSON.stringify(tabsDataJSON);

    chrome.storage.local.set(newStorageInfo, function () {});
  });
};
