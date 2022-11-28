import React from "react";
import { dataForAnalysis } from "../../../chrome_background/data/data";

export const CarbonInfos = () => {
  return (
    <div>
      <h2>How do we calculate those metrics ?</h2>
      <ul style={{ padding: "5px" }}>
        <li>
          Data exchanged (in Mb): we use the size of the HTTP request (method
          explained in the data analysis).
        </li>
        <li>Energy (in kWh): Two metrics are taken into account.</li>
        <ol>
          <li>
            The consumption of your browser. We use the following
            approximation : {dataForAnalysis.energy.kWhPerMinuteDevice} kWh per
            minutes of device.{" "}
          </li>
          <li>
            The energy necessary to transfer the Mb of data. We use the
            following approximation :
            {dataForAnalysis.energy.kWhPerByteDataCenter +
              dataForAnalysis.energy.kWhPerByteNetwork}
            kWh per byte exchanged.
          </li>
        </ol>
        <li>
          Carbon (in gram of co2 per kWh): we use the following approximations{" "}
          {
            dataForAnalysis.carbonIntensity.byRegion
              .carbonIntensityFactorIngCO2PerKWh.global
          }{" "}
          gCO2/kWh. This number represents the carbon intensity for electricity
          production worldwide (according to the international energy agency in
          2019).
        </li>
        <li>
          For the light bulb comparison we estimate that a light bulb power is{" "}
          {dataForAnalysis.examples.lightbulbPowerInWatt} W.
        </li>
      </ul>
      <h2>What are the limitation ?</h2>
      <div>
        As you can see, this is mostly approximations and order of magnitudes.
        There are a lot of limitations :
        <ol style={{ padding: "5px" }}>
          <li>
            We have no idea of the geographic region of the servers.
            Therefore, we can only estimate the carbon intensity of the
            electricity consumed.
          </li>
          <li>
            We only monitor the data exchanged we have no metrics regarding the
            server usage.
          </li>
          <li>
            We can only approximate the energy consumed by your device when
            using the browser.
          </li>
        </ol>
      </div>
      <div>
        We hope to develop futur version of this plugin in order to better
        assess the real consumption of your internet usage.
      </div>
    </div>
  );
};
