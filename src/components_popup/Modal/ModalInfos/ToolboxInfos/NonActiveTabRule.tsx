import React from "react";

export const OfflineTabsInfos = () => {
  return (
    <div>
      <h2>Why and What ? </h2>
      <div>
        Many of us, when using chrome, we open several tabs to better organize
        our navigation. These tabs are always connected to the internet even if
        we are doing something totally different on our computer. The idea is to
        set all these "non active tabs" offline, to prevent unwanted and
        unnecessary connection to servers.
      </div>
      <h2>Warning</h2>
      <div>
        If you choose to use this tool. You won't receive any notifications from
        non active tabs as they are offline. If you listen to a podcast while
        doing something else it will eventually stop... In short everything you
        don't see on your browser is offline.
      </div>
      <h2>Measuring the impact</h2>
      <div>
        If you go on the analysis section on the data part you will see the
        approximate data exchanged between your browser and the servers. This is
        where the offline tab rule as an impact it will decrease the amount of
        data exchanged. It is difficult to measure the impact as we don't what
        would have been consumed without. Furthermore, we hope this will raise
        awareness on the fact that even if your are not using something on your
        browser it consumed energy and thus produces CO2.
      </div>
    </div>
  );
};
