import React, { useEffect, useState } from "react";
import { SimpleModal } from "../../Modal/Modal";
import { IconButton } from "../../Shared/Buttons/IconButton";
import { InfosButton } from "../../Shared/Buttons/InfosButton";
import { ChartBlock } from "../../Shared/PieChart/ChartBlock";
import details from "./../../Assets/details.png";
import { timeTrackingPercentage } from "./Time.methods";
import { TimeTrackingDetails } from "./TimeTrackingDetails";


export const TimeInfos = () => {
  return (
    <div>
      <h1>Information regarding the time tracking method : </h1>
      <h2>How does it work ?</h2>
      <p>Whenever the focus change we check if the chrome window is active. If it is the case we look for the website on the active tab and we assign the time passed to this website.</p>
      <h2>What are the limitations ? </h2>
      <p>The main limitation is that we only focus on active tab. It means that if you are listenning to a podcast or downloading information but that you are not on the corresponding tab the time will not be assign to this website.</p>
    </div>
  );
};
