const setByteLengthPerOrigin = (origin: string, byteLength: number) => {
  chrome.storage.local.get(["TabsCarbon"], function (result) {
    const tabsCarbonJSON =
      result["TabsCarbon"] === null ? {} : JSON.parse(result["TabsCarbon"]);
    let bytePerOrigin =
      undefined === tabsCarbonJSON[origin]
        ? 0
        : parseInt(tabsCarbonJSON[origin]);
    tabsCarbonJSON[origin] = bytePerOrigin + byteLength;
    let newStorageInfo: any = {};
    newStorageInfo["TabsCarbon"] = JSON.stringify(tabsCarbonJSON);
    chrome.storage.local.set(newStorageInfo, function () {});
  });
};/* 

const headersReceivedListener = (requestDetails) => {
  if (isChrome()) {
    const origin = extractHostname(
      !requestDetails.initiator ? requestDetails.url : requestDetails.initiator
    );
    const responseHeadersContentLength = requestDetails.responseHeaders.find(
      (element) => element.name.toLowerCase() === "content-length"
    );
    const contentLength =
      undefined === responseHeadersContentLength
        ? { value: 0 }
        : responseHeadersContentLength;
    const requestSize = parseInt(contentLength.value, 10);
    setByteLengthPerOrigin(origin, requestSize);

    return {};
  }

  let filter = browser.webRequest.filterResponseData(requestDetails.requestId);

  filter.ondata = (event) => {
    const origin = extractHostname(
      !requestDetails.originUrl ? requestDetails.url : requestDetails.originUrl
    );
    setByteLengthPerOrigin(origin, event.data.byteLength);

    filter.write(event.data);
  };

  filter.onstop = () => {
    filter.disconnect();
  };

  return {};
};

const setBrowserIcon = (type) => {
  chrome.browserAction.setIcon({ path: `icons/icon-${type}-48.png` });
};

const addOneMinute = () => {
  let duration = localStorage.getItem("duration");
  duration = null === duration ? 1 : 1 * duration + 1;
  localStorage.setItem("duration", duration);
};

let addOneMinuteInterval;

const handleMessage = (request) => {
  if ("start" === request.action) {
    setBrowserIcon("on");

    chrome.webRequest.onHeadersReceived.addListener(
      headersReceivedListener,
      { urls: ["<all_urls>"] },
      ["responseHeaders"]
    );

    if (!addOneMinuteInterval) {
      addOneMinuteInterval = setInterval(addOneMinute, 60000);
    }

    return;
  }

  if ("stop" === request.action) {
    setBrowserIcon("off");
    chrome.webRequest.onHeadersReceived.removeListener(headersReceivedListener);

    if (addOneMinuteInterval) {
      clearInterval(addOneMinuteInterval);
      addOneMinuteInterval = null;
    }
  }
};

chrome.runtime.onMessage.addListener(handleMessage);
 */