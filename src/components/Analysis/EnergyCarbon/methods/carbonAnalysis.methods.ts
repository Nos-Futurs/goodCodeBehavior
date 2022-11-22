import { dataForAnalysis } from "../../../../chrome/data/data";

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
      .defaultLocation;
  return { energy, carbon };
};