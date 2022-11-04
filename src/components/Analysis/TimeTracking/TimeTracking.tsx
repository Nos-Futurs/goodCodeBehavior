import React, { useEffect, useState } from "react";

export const TimeTracking = () => {
  const [timeTracked, setTimeTracked] = useState<any>([]);
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
      console.log("dataArray", dataArray);
      setTimeTracked(dataArray);
    };
    // call the function
    fetchData();
  }, []);

  return (
    <div style={{flexDirection: "column"}}>
      {timeTracked.map((item: { domain: string; time: string }) => {
        return <div>{item.domain + " : " + item.time + "seconds"}</div>;
      })}
    </div>
  );
};
