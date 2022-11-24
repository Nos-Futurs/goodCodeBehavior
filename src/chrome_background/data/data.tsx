// data for analysis

const kWhPerByteDataCenter = 0.000000000072;
const kWhPerByteNetwork = 0.000000000152;
const kWhPerMinuteDevice = 0.00021;

const GESgCO2ForOneKmByCar = 220;
const GESgCO2ForOneChargedSmartphone = 8.3;

const carbonIntensityFactorIngCO2PerKWh = {
  'regionEuropeanUnion': 276,
  'regionFrance': 34.8,
  'regionUnitedStates': 493,
  'regionChina': 681,
  'defaultLocation': 519
};

const lightbulbPowerInWatt = 100

export const dataForAnalysis = {
    "energy":{
        kWhPerByteDataCenter,
        kWhPerByteNetwork,
        kWhPerMinuteDevice,
    }, 
    "carbonIntensity": {
        "byRegion": {
            carbonIntensityFactorIngCO2PerKWh
        },
        "examples":{
            GESgCO2ForOneKmByCar,
            GESgCO2ForOneChargedSmartphone
        }
    }, 
    "examples": {
        lightbulbPowerInWatt
    }
}