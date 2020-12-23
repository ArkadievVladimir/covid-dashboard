import { fromArray } from '@amcharts/amcharts4/.internal/core/utils/Iterator';
import React, { useEffect, useState } from 'react';
import { getHistoryStatCountry } from '../../../InitialStateComponent/index';
import './TableComponent.css';
import  FullScreenBtnComponent from '../../LeftSideComponent/ListComponent/FullScreenBtnComponent/index';

const TableComponent = ({stat, activeCountry, global, countries}) => {
    let countriesList
    const keys = Object.keys(global);
    let data;
  
    if (activeCountry) {
    [data] = countries.filter((el) => el.CountryCode === activeCountry);
  } else {
    data = global;
  }

  if (keys) {
    countriesList = keys.map((elem, i) => {
        return (
            <li key={i} className="cases-wrapper">
            <span className="country-stat-wrapper" style={{width: "40%"}}>{data[elem]} </span>
            <span className="country-wrapper"  style={{width: "60%"}}>{elem}</span>
            </li>
        );
    })
  }

  const [fullScreen, setfullScreen] = useState(false);
  function onFullScreen () {
    setfullScreen(!fullScreen);
    const body = document.getElementsByTagName('body');
    if(body[0].style.overflow === "hidden") {
      body[0].style.overflow = "auto";
    } else {
      body[0].style.overflow = "hidden";
    } 
  };
  const zIndex = 'zIndex';
  const background = 'backgroundColor';
  const style = {
    position: fullScreen ? "absolute" : "relative",
    top: fullScreen ? "0" : "0",
    bottom: fullScreen ? "0" : "0",
    left: fullScreen ? "0" : "0",
    right: fullScreen ? "0" : "0",
    width: fullScreen ? "100%" : "100%",
    height: fullScreen ? "120%" : "49%",
    [background]: fullScreen ? "black" : "#222222",
    [zIndex]: fullScreen ? "1000" : "0",
    marginBottom: fullScreen ? "0" : "1%",
  };

  return (
    <div style={style} className="list-wrapper" >
        <h2>Country/global statistics</h2>
        <FullScreenBtnComponent onFullScreen={onFullScreen}/>
        <ul className="lists-wrapper">
            {countriesList}
        </ul>
    </div>
  );
};

export default TableComponent;