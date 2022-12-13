import { dataForAnalysis } from "../../../chrome_background/data/data";

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
      .global;
  return { energy, carbon };
};