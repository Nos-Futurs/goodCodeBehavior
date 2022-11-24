import { getDomainName } from "../Shared.module";

export const headersReceivedListener = (details: any) => {
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
    const tabsDataJSON =
      result["TabsData"] === null || JSON.stringify(result) === "{}"
        ? {}
        : JSON.parse(result["TabsData"]);
    let bytePerOrigin =
      undefined === tabsDataJSON[origin]
        ? 0
        : parseInt(tabsDataJSON[origin].bytes);

    let numberOfRequestsPerOrigin =
      undefined === tabsDataJSON[origin]
        ? 0
        : parseInt(tabsDataJSON[origin].numberOfRequests);
    tabsDataJSON[origin] = {
      bytes: bytePerOrigin + byteLength,
      numberOfRequests: numberOfRequestsPerOrigin + 1,
    };
    let newStorageInfo: any = {};
    newStorageInfo["TabsData"] = JSON.stringify(tabsDataJSON);

    chrome.storage.local.set(newStorageInfo, function () {});
  });
};
