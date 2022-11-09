// Isolate domain name from url
export function getDomainName(url: string) {
    const httpRemoved = url.split("//")[1];
    const domainName = httpRemoved.split("/")[0];
    return domainName;
  }