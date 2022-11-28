import React from "react";

export const TimeInfos = () => {
  return (
    <div>
      <h1>Information regarding the time tracking method : </h1>
      <h2>How does it work ?</h2>
      <p>
        Whenever the focus changes we look for the website on the current active
        tab. Then, we assign the time passed between two changes in focus to the
        first website.
      </p>
      <h2>What are the limitations ? </h2>
      <p>
        The main limitation is that we only monitor the time spent on the active
        (open) tab. It means that if you are listenning to a podcast or
        downloading information but the corresponding tab isn't actively open
        the time won't be assign to this website.
      </p>
    </div>
  );
};
