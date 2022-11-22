export const dataTrackingPercentage = (
  data: { domain: string; bytes: number }[]
): {
  title: string;
  value: number;
  color: string;
}[] => {
  let totalData = 0;
  let minDisplayedWebSite: {
    domain: string;
    bytes: number;
  } = {
    domain: "start",
    bytes: 0,
  };
  let displayedWebSite: {
    domain: string;
    bytes: number;
  }[] = [minDisplayedWebSite];

  data.map((datum) => {
    if (displayedWebSite.length < 4) {
      displayedWebSite.push({
        domain: datum.domain,
        bytes: datum.bytes,
      });
      if (minDisplayedWebSite.bytes > datum.bytes) {
        minDisplayedWebSite = datum;
      }
    } else {
      if (minDisplayedWebSite.bytes < datum.bytes) {
        let index = displayedWebSite.indexOf(minDisplayedWebSite);
        displayedWebSite.splice(index, 1);
        minDisplayedWebSite = datum;
        displayedWebSite.map((displaySite) => {
          if (minDisplayedWebSite.bytes > displaySite.bytes) {
            minDisplayedWebSite = displaySite;
          }
        });
        displayedWebSite.push(datum);
      }
    }
    totalData = totalData + datum.bytes;
  });
  const color = ["#004225", "#138808", "#8FD400", "#90EE90", "#D0F0C0"];
  let resultArrayData = [];
  let mainSiteData: number = 0;
  let compteur = 0;

  displayedWebSite.map((website) => {
    let percentageData = Math.floor(100 * (website.bytes / totalData));

    resultArrayData.push({
      title: website.domain,
      value: percentageData,
      color: color[compteur],
    });
    compteur++;
    mainSiteData = mainSiteData + website.bytes;
  });
  const otherData: number = totalData - mainSiteData;
  resultArrayData.push({
    title: "others",
    value: Math.floor(100 * (otherData / totalData)),
    color: color[compteur],
  });

  return resultArrayData;
};
