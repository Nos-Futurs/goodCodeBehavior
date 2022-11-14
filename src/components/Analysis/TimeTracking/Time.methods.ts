export const timeTrackingPercentage = (
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
  