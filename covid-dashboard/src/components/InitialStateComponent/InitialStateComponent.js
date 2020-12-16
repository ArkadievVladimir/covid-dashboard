import React from 'react';
import CovidService from '../ServiceComponent/index';

const covidStat = new CovidService();
  
const covidStatState = [];

const globalState = {};

const countriesStat = covidStat.getAllCases().then((body) => {
  return body.Countries;
});

const newConfirmed = covidStat.getAllCases().then((body) => {
  return body.Global.NewConfirmed;
});

const newDeaths = covidStat.getAllCases().then((body) => {
  return body.Global.NewDeaths;
});

const newRecovered = covidStat.getAllCases().then((body) => {
  return body.Global.NewRecovered;
});

const totalConfirmed = covidStat.getAllCases().then((body) => {
  return body.Global.TotalConfirmed;
});

const totalDeaths = covidStat.getAllCases().then((body) => {
  return body.Global.TotalDeaths;
});

const totalRecovered = covidStat.getAllCases().then((body) => {
  return body.Global.TotalRecovered;
});

const countryFlag = covidStat.getAllCountriesPopulationAndFlags().then((body) => {
  const flags = body.map((item) => {
    return item.flag;
  })
  return flags;
});

const countryPopulation = covidStat.getAllCountriesPopulationAndFlags().then((body) => {
  const population = body.map((item) => {
    return item.population;
  })
  return population;
});

globalState.newConfirmed = newConfirmed
globalState.newDeaths = newDeaths;
globalState.newRecovered = newRecovered;
globalState.totalConfirmed = totalConfirmed;
globalState.totalDeaths = totalDeaths;
globalState.totalRecovered = totalRecovered;

covidStatState.push(countriesStat);
covidStatState.push(countryFlag);
covidStatState.push(countryPopulation);
covidStatState.push(globalState);
console.log(covidStatState);

export default covidStatState;