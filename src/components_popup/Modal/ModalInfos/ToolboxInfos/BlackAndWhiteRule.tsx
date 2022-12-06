import React from "react";

export const BlackAndWhiteRuleInfos = () => {
  return (
    <div>
      <h2>What does it do ? </h2>
      <div>
        The whole browser will be set to black and white. This will reduce the
        time you spend on the internet as the black and white set up captures
        your attention much less.
      </div>
      <h2>How does it work ? </h2>
      <div>
        For it to work we insert a line of code in the body of the web page.
        This line "filter: grayscale(100%)" will act as a filter to stop colors
        from behing displayed.
      </div>
      <h2>Note</h2>
      <div>
        One might think that setting its browser to black and white would
        decrease the energy consumption of its computer. It's not the case, the
        energy consumed stay the same, indeed, the energy used by your computer
        only depends on the brightness of colors. The only way to decrease
        energy consumption by changing colors is to darken the colors. One
        useful hack would be to set your browser in dark mode.
      </div>
      <div>
        However, if you switch to black and white you'll tend to spend less time
        using internet which will automatically result in energy savings even if
        it is not easily measurable.
      </div>
    </div>
  );
};

