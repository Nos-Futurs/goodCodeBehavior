/**
 * Isolate domain name from url
 * @param url
 * @returns
 */
export function getDomainName(url: string) {
  const httpRemoved = url.split("//")[1];
  const domainName = httpRemoved.split("/")[0];
  return domainName;
}

/**
 * affect storage object
 * @param objectJSON
 * @param returnObject
 * @returns
 */
export function storageObject(objectJSON: string, returnObject?: any) {
  if (
    JSON.stringify(objectJSON) !== "{}" &&
    objectJSON !== undefined &&
    JSON.stringify(objectJSON) !== "undefined" &&
    JSON.stringify(objectJSON) !== "null" &&
    objectJSON !== null
  ) {
    return JSON.parse(objectJSON);
  }
  return returnObject !== undefined ? returnObject : {};
}

/**
 * remove wwww. for chart items legend
 * @param domainName
 * @returns
 */
export function cleanDomainName(domainName: string): string {
  if (domainName.slice(0, 4) === "www.") {
    return domainName.slice(4);
  } else {
    return domainName;
  }
}


/**
 * Get the estimated size of request and response headers
 * @param headers 
 * @returns 
 */
export function estimatedBinarySize(headers: Array<any>): number {
  let totalBytes = 0;
  headers.map((header) => {
    for (let key in header) {
      totalBytes = binarySizePerType(key) + binarySizePerType(header[key]);
    }
  });
  return totalBytes;
}

function binarySizePerType(element: any) {
  const bytePerBoolean = 4;
  const bytePerChar = 2;
  const bytePerNumber = 8;
  if (typeof element === "boolean") {
    return bytePerBoolean;
  } else if (typeof element === "string") {
    return bytePerChar * element.length;
  } else if (typeof element === "number") {
    return bytePerNumber;
  }
  return 0;
}
