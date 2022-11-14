import { getDomainName } from "./Shared.module";

const setByteLengthPerOrigin = (origin: string, byteLength: number) => {
  chrome.storage.local.get(["TabsCarbon"], function (result) {
    const tabsCarbonJSON =
      result["TabsCarbon"] === null || JSON.stringify(result) === "{}"
        ? {}
        : JSON.parse(result["TabsCarbon"]);
    let bytePerOrigin =
      undefined === tabsCarbonJSON[origin]
        ? 0
        : parseInt(tabsCarbonJSON[origin]);
    tabsCarbonJSON[origin] = bytePerOrigin + byteLength;
    let newStorageInfo: any = {};
    newStorageInfo["TabsCarbon"] = JSON.stringify(tabsCarbonJSON);

    chrome.storage.local.set(newStorageInfo, function () {});
  });
};

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
  console.log("chocolat");
  let newStorageInfo: any = {};
  newStorageInfo["TabsCarbon"] = null;
  chrome.storage.local.set(newStorageInfo, function () {});
};
