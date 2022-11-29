// Isolate domain name from url
export function getDomainName(url: string) {
  const httpRemoved = url.split("//")[1];
  const domainName = httpRemoved.split("/")[0];
  return domainName;
}

// affect storage object
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
