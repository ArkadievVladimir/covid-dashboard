import React, { useEffect, useState } from 'react';
import './ListComponent.css';
import SearchPanelComponent from './SearchPanelComponent/index';
import { getHistoryStatCountry } from '../../../InitialStateComponent/index';

const ListComponent = ({countries, stat, activeCountry, setActiveCountry, setCountryHistoryStat}) => {
  const [temp, setTemp] = useState('');
  
  function onSearch(temp) {
    setTemp(temp);
  }

  async function setCountry(e) {
    const selectedCountyCode = e.target.closest('.cases-wrapper').dataset.selectedCountry
    setActiveCountry(selectedCountyCode);

    // console.log(selectedCountyCode)
    const historyData =  await getHistoryStatCountry(selectedCountyCode, countries)
      // console.log('historyData', historyData)
    setCountryHistoryStat(historyData);
    // const historyData = getHistoryStatCountry(selectedCountyCode)
    // setCountryHistoryStat(historyData);
  };
  

  function changeHighlightSelectedCountry(activeCountry) {
    if (document.querySelector('.active-country')) {
      document.querySelector('.active-country').classList.toggle('active-country');
    }
    if (document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`)) {
      document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`).classList.toggle('active-country');
    }
  }

  changeHighlightSelectedCountry(activeCountry); 
  // console.log(activeCountry);

  const visibleItems = (function search(countries, temp) {
    if (temp.length === 0) {
      return countries;
  };

  return countries.filter((country) => {
      return country.Country.
      toLowerCase()
      .indexOf(temp.toLowerCase()) > -1;
    });
  })(countries, temp);
  
  const countriesList = visibleItems.map((item) => {
    const state = {
        id: item.id,
        countryName: item.Country,
        ...item
    };

    // let prop;
    // if (stat === 0) {
    //   prop = item.TotalConfirmed;
    // } else if (stat === 1) {
    //   prop = item.TotalRecovered;
    // } else if (stat === 2) {
    //   prop = item.TotalDeaths;
    // } else if (stat === 3) {
    //   prop = item.NewConfirmed;
    // } else if (stat === 4) {
    //   prop = item.NewRecovered;
    // } else if (stat === 5) {
    //   prop = item.NewDeaths;
    // } else if (stat === 6) {
    //   prop = item.GlobalCasesPer100Thousand;
    // } else if (stat === 7) {
    //   prop = item.GlobalRecoveredPer100Thousand;
    // } else if (stat === 8) {
    //   prop = item.GlobalDeathesPer100Thousand;
    // } else if (stat === 9) {
    //   prop = item.NewGlobalCasesPer100Thousand;
    // } else if (stat === 10) {
    //   prop = item.NewGlobalRecoveredPer100Thousand;
    // } else if (stat === 11) {
    //   prop = item.NewGlobalDeathsPer100Thousand;
    // };
  
    return (
      <li key={state.id} data-selected-country={state.CountryCode} onClick={setCountry} className="cases-wrapper">
        <span className="country-stat-wrapper">{item[stat]}</span>
        <span className="country-wrapper">{state.countryName}</span>
        <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag"></img></div>
      </li>
    );
  });
  
  countriesList.sort((a, b) => {
    return b.props.children[0].props.children - a.props.children[0].props.children; 
  });

  return (
    <div className="list-wrapper">
        <h2>Cases by Country/Region/Sovereignity</h2>
        <SearchPanelComponent 
          onSearch={onSearch}/>
        <ul className="lists-wrapper">
            {countriesList}
        </ul>
    </div>
  );
};

export default ListComponent;
