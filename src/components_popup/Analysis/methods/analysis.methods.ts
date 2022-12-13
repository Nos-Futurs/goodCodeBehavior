import { cleanDomainName } from "../../../chrome_background/modules/Shared.module";

/**
 * Format the time
 * takes seconds and return XX hours XX minutes XX seconds
 * @param time
 * @returns
 */
export const formatItemTime = (time: number) => {
  const timeInSeconds = Math.floor(time);
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds - hours * 3600) / 60);
  const seconds = timeInSeconds - hours * 3600 - minutes * 60;

  const hoursString = hours > 0 ? `${hours} hours ` : "";
  const minutesString = hours > 0 || minutes > 0 ? `${minutes} minutes ` : "";
  const secondsString = `${seconds} seconds`;
  return hoursString + minutesString + secondsString;
};

/**
 * method that takes all the data and return an array of objects representing
 * the 4 datum with the highest value and the rest as others
 *
 * Used to create the chart data
 *
 * @param data
 * @returns
 */
export const trackingPercentage = (
  data: { domain: string; value: number }[]
): {
  title: string;
  value: number;
  color: string;
}[] => {
  // set colors for the chart
  const color = ["#004225", "#138808", "#8FD400", "#90EE90", "#D0F0C0"];

  // get the four (or less) highest elements of the data set
  const displayedWebSite: {
    domain: string;
    value: number;
  }[] = getTheFourHighestElements(data);

  // get the total value of the data set
  let totalData = 0;
  data.map((datum) => {
    totalData = totalData + datum.value;
  });

  // Create the percentage array formated for the display chart
  let resultArrayData = [];
  let mainSiteData: number = 0;
  let compteur = 0;

  displayedWebSite.map((website) => {
    let percentageData = Math.floor(100 * (website.value / totalData));
    resultArrayData.push({
      title: cleanDomainName(website.domain),
      value: percentageData,
      color: color[compteur],
    });
    compteur++;
    mainSiteData = mainSiteData + website.value;
  });
  // Add the "others" value
  const otherData: number = totalData - mainSiteData;
  resultArrayData.push({
    title: "others",
    value: totalData === 0 ? 0 : Math.floor(100 * (otherData / totalData)),
    color: color[compteur],
  });

  // filter to sort out all data with a value equal to zero
  // this can happen if the original dataSet is very small
  resultArrayData = resultArrayData.filter((result) => result.value > 0);

  return resultArrayData;
};

/* -------------------------------------------------------------------------- */
/*                               PRIVATE METHODS                              */
/* -------------------------------------------------------------------------- */

const getTheFourHighestElements = (
  data: { domain: string; value: number }[]
) => {
  const sortedData = data.sort((a, b) => b.value - a.value);
  const slicedArray = sortedData.slice(0, 4);
  return slicedArray;
};
