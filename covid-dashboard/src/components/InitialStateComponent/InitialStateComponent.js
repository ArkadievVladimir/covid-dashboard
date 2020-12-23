import CovidService from '../ServiceComponent/index';

export const covidStatState = () => {
  const service = new CovidService();
  async function updateStatisctic() {
    const state = {};
    let covidData;
    let globalStat;
    let populationCount = 0;
    let ind = 0;
    await service
      .getAllCases()
      .then(({ Global, Countries }) => {
        globalStat = Global;
        covidData = Countries;
      })
      .then(async () => {
        await service
        .getAllCountriesPopulationAndFlags()
        .then((countriesStat) => {
          covidData.forEach((elem) => {
            countriesStat.forEach((item) => {
              if (elem.CountryCode === item.alpha2Code) {
                Object.assign(elem, item);
                ['alpha2Code', 'name', 'Slug', 'Date', 'Premium'].forEach((i) => delete elem[i]);
                elem.id = ind++;
                elem['Total confirmed'] = elem.TotalConfirmed;
                elem['Total recovered'] = elem.TotalRecovered;
                elem['Total deaths'] = elem.TotalDeaths;
                elem['New confirmed'] = elem.NewConfirmed;
                elem['New recovered'] = elem.NewRecovered;
                elem['New deaths'] = elem.NewDeaths;
                elem['Global cases per 100 thousand'] = setAutoRound(elem.TotalConfirmed / (elem.population / 100000));
                elem['Global recovered per 100 thousand'] = setAutoRound(elem.TotalRecovered / (elem.population / 100000));
                elem['Global deaths per 100 thousand'] = setAutoRound(elem.TotalDeaths / (elem.population / 100000));
                elem['New global cases per 100 thousand'] = setAutoRound(elem.NewConfirmed / (elem.population / 100000));
                elem['New global recovered per 100 thousand'] = setAutoRound(elem.NewRecovered / (elem.population / 100000));
                elem['New global deaths per 100 thousand'] = setAutoRound(elem.NewDeaths / (elem.population / 100000));
                ['TotalConfirmed', 'TotalRecovered', 'TotalDeaths', 'NewConfirmed', 'NewRecovered', 'NewDeaths'].forEach((i) => delete elem[i]);
                populationCount += item.population;
              }
            })
          })
          const globalCasesPer100Thousand = setAutoRound(globalStat.TotalConfirmed / (populationCount / 100000));
          const globalRecoveredPer100Thousand = setAutoRound(globalStat.TotalRecovered / (populationCount / 100000));
          const globalDeathsPer100Thousand = setAutoRound(globalStat.TotalDeaths / (populationCount / 100000));
          const newGlobalCasesPer100Thousand = setAutoRound(globalStat.NewConfirmed / (populationCount / 100000));
          const newGlobalRecoveredPer100Thousand = setAutoRound(globalStat.NewRecovered / (populationCount / 100000));
          const newGlobalDeathsPer100Thousand = setAutoRound(globalStat.NewDeaths / (populationCount / 100000));
          const globalCovidData = {
            'Total confirmed': globalStat.TotalConfirmed,
            'Total recovered': globalStat.TotalRecovered,
            'Total deaths': globalStat.TotalDeaths,
            'New confirmed': globalStat.NewConfirmed,
            'New recovered': globalStat.NewRecovered,
            'New deaths': globalStat.NewDeaths,
            'Global cases per 100 thousand': globalCasesPer100Thousand,
            'Global recovered per 100 thousand': globalRecoveredPer100Thousand,
            'Global deaths per 100 thousand': globalDeathsPer100Thousand,
            'New global cases per 100 thousand': newGlobalCasesPer100Thousand,
            'New global recovered per 100 thousand': newGlobalRecoveredPer100Thousand,
            'New global deaths per 100 thousand': newGlobalDeathsPer100Thousand,
          }
          state.countriesStat = covidData;
          state.globalStat = globalCovidData;
        }).then(async () => {
          await service
          .getHistoryGlobalCases()
          .then((historyStat) => {
            const historyData = historyStat.map((elem, i) => {
              let newConfirmed = 0;
              let newRecovered = 0;
              let newDeaths = 0;
              if (historyStat[i + 1]) {
                newConfirmed = elem.total_cases - historyStat[i + 1].total_cases;
                if (newConfirmed < 0) newConfirmed = 0;
                newRecovered = elem.total_recovered - historyStat[i + 1].total_recovered;
                if (newRecovered < 0) newRecovered = 0;
                newDeaths = elem.total_deaths - historyStat[i + 1].total_deaths;
                if (newDeaths < 0) newDeaths = 0;
              }
              const totalConfirmedPer100Thousand = setAutoRound(elem.total_cases / (populationCount / 100000));
              const totalRecoveredPer100Thousand = setAutoRound(elem.total_recovered / (populationCount / 100000));
              const totalDeathsPer100Thousand = setAutoRound(elem.total_deaths / (populationCount / 100000));
              const newConfirmedPer100Thousand = setAutoRound(newConfirmed / (populationCount / 100000));
              const newRecoveredPer100Thousand = setAutoRound(newRecovered / (populationCount / 100000));
              const newDeathsPer100Thousand = setAutoRound(newDeaths / (populationCount / 100000));
              return {
                date: elem.last_update,
                'Total confirmed': elem.total_cases,
                'Total recovered': elem.total_recovered,
                'Total deaths': elem.total_deaths,
                'New confirmed': newConfirmed,
                'New recovered': newRecovered,
                'New deaths': newDeaths,
                'Global cases per 100 thousand': totalConfirmedPer100Thousand,
                'Global recovered per 100 thousand': totalRecoveredPer100Thousand,
                'Global deaths per 100 thousand': totalDeathsPer100Thousand,
                'New global cases per 100 thousand': newConfirmedPer100Thousand,
                'New global recovered per 100 thousand': newRecoveredPer100Thousand,
                'New global deaths per 100 thousand': newDeathsPer100Thousand,
              }
            })
            state.historyData = historyData.reverse();
          })
        });
    })
    return state;
  }
  return updateStatisctic();
}
export async function getHistoryStatCountry(selectedCountyCode, countries) {
  let population;
  countries.forEach((item) => {
    if (item.CountryCode === selectedCountyCode) {
      population = item.population;
    }
  });
  const service = new CovidService();
  let historyData;
  await service
      .getHistoryCountryCases(selectedCountyCode)
        .then((response) => {
          historyData = response.map((elem, i) => {
            let newConfirmed = 0;
            let newRecovered = 0;
            let newDeaths = 0;
            if (response[i + 1]) {
              newConfirmed = response[i + 1].Confirmed - elem.Confirmed;
              if (newConfirmed < 0) newConfirmed = 0;
              newRecovered = response[i + 1].Recovered - elem.Recovered;
              if (newRecovered < 0) newRecovered = 0;
              newDeaths = response[i + 1].Deaths - elem.Deaths;
              if (newDeaths < 0) newDeaths = 0;
            }
            const totalConfirmedPer100Thousand = setAutoRound(elem.Confirmed / (population / 100000));
            const totalRecoveredPer100Thousand = setAutoRound(elem.Recovered / (population / 100000));
            const totalDeathsPer100Thousand = setAutoRound(elem.Deaths / (population / 100000));
            const newConfirmedPer100Thousand = setAutoRound(newConfirmed / (population / 100000));
            const newRecoveredPer100Thousand = setAutoRound(newRecovered / (population / 100000));
            const newDeathsPer100Thousand = newDeaths / (population / 100000);
            return {
              date: elem.Date,
              'Total confirmed': elem.Confirmed,
              'Total recovered': elem.Recovered,
              'Total deaths': elem.Deaths,
              'New confirmed': newConfirmed,
              'New recovered': newRecovered,
              'New deaths': newDeaths,
              'Global cases per 100 thousand': totalConfirmedPer100Thousand,
              'Global recovered per 100 thousand': totalRecoveredPer100Thousand,
              'Global deaths per 100 thousand': totalDeathsPer100Thousand,
              'New global cases per 100 thousand': newConfirmedPer100Thousand,
              'New global recovered per 100 thousand': newRecoveredPer100Thousand,
              'New global deaths per 100 thousand': newDeathsPer100Thousand,
            }
          })
        })
        return historyData;
}
function setAutoRound(num) {
  let roundedValue;
  if (num >=70) {
    roundedValue = num.toFixed(0);
  } else if (num < 0.001) {
    roundedValue = 0;
  } else if (num < 0.1) {
    roundedValue = num.toFixed(3);
  }else if (num < 1) {
    roundedValue = num.toFixed(3);
  } else if (num < 10) {
    roundedValue = num.toFixed(2);
  } else if (num < 70) {
    roundedValue = num.toFixed(1);
  }
  return roundedValue;
}
