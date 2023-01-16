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
