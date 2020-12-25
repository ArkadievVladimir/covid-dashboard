import React, { useState } from 'react';
import './ListComponent.css';
import SearchPanelComponent from './SearchPanelComponent/index';
import { getHistoryStatCountry } from '../../../InitialStateComponent/index';
import FullScreenBtnComponent from './FullScreenBtnComponent/index'

const ListComponent = ({countries, stat, activeCountry, setActiveCountry, setCountryHistoryStat}) => {
  const [temp, setTemp] = useState('');
  function onSearch(temp) {
    setTemp(temp);
  }
  function changeHighlightSelectedCountry(activeCountry) {
    if (document.querySelector('.active-country')) {
      document.querySelector('.active-country').classList.toggle('active-country');
    }
    if (document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`)) {
      document.querySelector(`.cases-wrapper[data-selected-country='${activeCountry}']`).classList.toggle('active-country');
    }
  }
  function onFullScreen () {
    setfullScreen(!fullScreen);
    const body = document.getElementsByTagName('body');
    if(body[0].style.overflow === "hidden") {
      body[0].style.overflow = "auto";
    } else {
      body[0].style.overflow = "hidden";
    } 
  };
  const [fullScreen, setfullScreen] = useState(false);
  async function setCountry(e) {
    const selectedCountyCode = e.target.closest('.cases-wrapper').dataset.selectedCountry
    setActiveCountry(selectedCountyCode);
    const historyData =  await getHistoryStatCountry(selectedCountyCode, countries)
    setCountryHistoryStat(historyData);
  }
  changeHighlightSelectedCountry(activeCountry); 
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
    return (
      <li key={state.id} data-selected-country={state.CountryCode} className="cases-wrapper">
        <span className="country-stat-wrapper">{item[stat]}</span>
        <span className="country-wrapper">{state.countryName}</span>
        <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag"></img></div>
      </li>
    );
  });
  countriesList.sort((a, b) => {
    return b.props.children[0].props.children - a.props.children[0].props.children; 
  });
  const zIndex = 'zIndex';
  const background = 'backgroundColor';
  const style = {
    position: fullScreen ? "absolute" : "relative",
    top: fullScreen ? "0" : "0",
    bottom: fullScreen ? "0" : "0",
    width: fullScreen ? "100%" : "100%",
    height: fullScreen ? "120%" : "79%",
    [background]: fullScreen ? "black" : "#222222",
    [zIndex]: fullScreen ? "1000" : "0",
  };
  return (
    <div className="list-wrapper" style={style}>
        <FullScreenBtnComponent onFullScreen={onFullScreen}/>
        <h2>Cases by Country/ Region/ Sovereignty</h2>
        <SearchPanelComponent 
          onSearch={onSearch}/>
        <ul className="lists-wrapper" onClick={setCountry}>
            {countriesList}
        </ul>
    </div>
  );
};

export default ListComponent;
