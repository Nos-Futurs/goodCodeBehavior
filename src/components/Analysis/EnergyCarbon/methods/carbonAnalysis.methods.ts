import { dataForAnalysis } from "../../../../chrome/data/data";

export const energyAndCarbonFromBytes = (
  bytes: number
): { energy: number; carbon: number } => {
  const energy =
    bytes *
    (dataForAnalysis.energy.kWhPerByteDataCenter +
      dataForAnalysis.energy.kWhPerByteNetwork);
  const carbon =
    energy *
    dataForAnalysis.carbonIntensity.byRegion.carbonIntensityFactorIngCO2PerKWh
      .defaultLocation;
  return { energy, carbon };
};

export const carbonTrackingPercentage = (
  data: { domain: string; bytes: number; energy: number; carbon: number }[],
): {
  data: {
    title: string;
    value: number;
    color: string;
  }[];
  energy: {
    title: string;
    value: number;
    color: string;
  }[];
  carbon: {
    title: string;
    value: number;
    color: string;
  }[];
} => {
  let totalData = 0;
  let totalEnergy = 0;
  let totalCarbon = 0;
  let displayedWebSite: {
    domain: string;
    bytes: number;
    energy: number;
    carbon: number;
  }[] = [];
  let minDisplayedWebSite: {
    domain: string;
    bytes: number;
    energy: number;
    carbon: number;
  } = {
    domain: "start",
    bytes: 0,
    energy: 0,
    carbon: 0,
  };

  data.map((datum) => {
    if (displayedWebSite.length < 4) {
      displayedWebSite.push({
        domain: datum.domain,
        bytes: datum.bytes,
        energy: datum.energy,
        carbon: datum.carbon,
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
    totalEnergy = totalEnergy + datum.energy;
    totalCarbon = totalCarbon + datum.carbon;
  });
  const color = ["#004225", "#138808", "#8FD400", "#90EE90", "#D0F0C0"];
  let resultArrayData = [];
  let resultArrayEnergy = [];
  let resultArrayCarbon = [];
  let mainSiteData: number = 0;
  let mainSiteEnergy: number = 0;
  let mainSiteCarbon: number = 0;
  let compteur = 0;

  displayedWebSite.map((website) => {
    let percentageData = Math.floor(100 * (website.bytes / totalData));
    let percentageEnergy = Math.floor(100 * (website.energy / totalEnergy));
    let percentageCarbon = Math.floor(100 * (website.carbon / totalCarbon));
    resultArrayData.push({
      title: website.domain,
      value: percentageData,
      color: color[compteur],
    });
    resultArrayEnergy.push({
      title: website.domain,
      value: percentageEnergy,
      color: color[compteur],
    });
    resultArrayCarbon.push({
      title: website.domain,
      value: percentageCarbon,
      color: color[compteur],
    });
    compteur++;
    mainSiteData = mainSiteData + website.bytes;
    mainSiteEnergy = mainSiteEnergy + website.energy;
    mainSiteCarbon = mainSiteCarbon + website.carbon;
  });
  const otherData: number = totalData - mainSiteData;
  const otherEnergy: number = totalEnergy - mainSiteEnergy;
  const otherCarbon: number = totalCarbon - mainSiteCarbon;
  resultArrayData.push({
    title: "others",
    value: Math.floor(100 * (otherData / totalData)),
    color: color[compteur],
  });
  resultArrayEnergy.push({
    title: "others",
    value: Math.floor(100 * (otherEnergy / totalEnergy)),
    color: color[compteur],
  });
  resultArrayCarbon.push({
    title: "others",
    value: Math.floor(100 * (otherCarbon / totalCarbon)),
    color: color[compteur],
  });
  
  return {data: resultArrayData, energy: resultArrayEnergy,  carbon: resultArrayCarbon};
};
