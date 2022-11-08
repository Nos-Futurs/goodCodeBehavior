import React, { useEffect, useState } from "react";
import { ChartLegendItem } from "./Legend";
import { TimeTrackingChart } from "./TimeTrackingChart";

const timeTrackingPercentage = (
  data: { domain: string; time: number }[]
): { title: string; value: number; color: string }[] => {
  let totalTime = 0;
  let displayedWebSite: { domain: string; time: number }[] = [];
  let minDisplaedWebSite: { domain: string; time: number } = {
    domain: "start",
    time: 0,
  };
  data.map((webtime) => {
    if (displayedWebSite.length < 4) {
      displayedWebSite.push(webtime);
      if (minDisplaedWebSite.time > webtime.time) {
        minDisplaedWebSite = webtime;
      }
    } else {
      if (minDisplaedWebSite.time < webtime.time) {
        let index = displayedWebSite.indexOf(minDisplaedWebSite);
        displayedWebSite.splice(index, 1);
        minDisplaedWebSite = webtime;
        displayedWebSite.map((displaySite) => {
          if (minDisplaedWebSite.time > displaySite.time) {
            minDisplaedWebSite = displaySite;
          }
        });
        displayedWebSite.push(webtime);
      }
    }
    totalTime = totalTime + webtime.time;
  });
  const color = ["#004225", "#138808", "#8FD400", "#90EE90", "#D0F0C0"];
  let resultArray = [];
  let mainSiteTime: number = 0;
  let compteur = 0;
  displayedWebSite.map((website) => {
    let percentage = Math.floor(100 * (website.time / totalTime));
    resultArray.push({
      title: website.domain,
      value: percentage,
      color: color[compteur],
    });
    compteur++;
    mainSiteTime = mainSiteTime + website.time;
  });
  const otherTime: number = totalTime - mainSiteTime;
  resultArray.push({
    title: "others",
    value: Math.floor(100 * (otherTime / totalTime)),
    color: color[compteur],
  });
  return resultArray;
};

export const TimeTracking = () => {
  const [timeTracked, setTimeTracked] = useState<any>([]);
  const [chartData, setChartData] = useState<
    { title: string; value: number; color: string }[]
  >([]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await chrome.storage.local.get("tabsTimeObject");
      const dataObject = JSON.parse(data["tabsTimeObject"]);
      let dataArray = [];
      for (let timeInfos in dataObject) {
        dataArray.push({
          domain: timeInfos,
          time: dataObject[timeInfos].trackedSeconds,
        });
      }
      setChartData(timeTrackingPercentage(dataArray));
      setTimeTracked(dataArray);
    };
    // call the function
    fetchData();
  }, []);

  return (
    <div style={{ flexDirection: "column" }}>
      <div
        style={{
          width: "400px",
          height: "300px",
          marginTop: "15px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            margin: "15px",
            padding: "15px",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            border: "solid",
            borderWidth: "2px", 
            borderColor: "rgba(58, 112, 39, 1)",
            borderRadius: "10px"
          }}
        >
          <TimeTrackingChart chartData={chartData} />
          <div style={{ flexDirection: "column", display: "flex", padding: "20px" }}>
            {chartData.map((legend) => {
              return <ChartLegendItem legendItem={legend} />;
            })}
          </div>
        </div>
      </div>

      {timeTracked.map((item: { domain: string; time: string }) => {
        return <div>{item.domain + " : " + item.time + "seconds"}</div>;
      })}
    </div>
  );
};
