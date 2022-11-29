import { getDomainName, storageObject } from "../Shared.module";

export const headersReceivedListener = (details: any) => {
  if (details.initiator || details.url) {
    const origin = getDomainName(
      !details.initiator ? details.url : details.initiator
    );
    const contentLengthFromResponse = details.responseHeaders.find(
      (element: any) => element.name.toLowerCase() === "content-length"
    );
    const contentLength = !contentLengthFromResponse
      ? { value: 0 }
      : contentLengthFromResponse;
    const requestSize = parseInt(contentLength.value, 10);
    setByteLengthPerOrigin(origin, requestSize);
  }
};

export const clearCarbonAnalysis = () => {
  let newStorageInfo: any = {};
  newStorageInfo["TabsData"] = null;
  chrome.storage.local.set(newStorageInfo, function () {});
};

// PRIVATE METHODS

/**
 *
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
