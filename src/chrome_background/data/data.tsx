// data for analysis

const kWhPerByteDataCenter = 0.000000000072; // shift Project 2016
const kWhPerByteNetwork = 0.000000000152; // shift Project 2016
const kWhPerMinuteDevice = 0.00021; // shift Project 2016

const GESgCO2ForOneKmByCar = 220; // shift Project 2016
const GESgCO2ForOneChargedSmartphone = 8.3; // shift Project 2016

const carbonIntensityFactorIngCO2PerKWh = {
  'regionEuropeanUnion': 276, // shift Project 2016
  'regionFrance': 34.8, // shift Project 2016
  'regionUnitedStates': 493, // shift Project 2016
  'regionChina': 681, // shift Project 2016
  'global': 475 // International Energy Agency 2019 
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