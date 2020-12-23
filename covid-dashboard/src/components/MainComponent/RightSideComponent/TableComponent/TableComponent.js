import React, { useEffect, useState } from 'react';
import { getHistoryStatCountry } from '../../../InitialStateComponent/index';
import './TableComponent.css';

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
            <span className="country-stat-wrapper">{data[elem]}</span>
            <span className="country-wrapper">{elem}</span>
            <div className="country-flag-wrapper"></div>
            </li>
        );
    })
  }
  return (
    <div className="list-wrapper" style={{ width: "100%", height: "50%" }}>
        <h2>Country/global statistics</h2>
        <ul className="lists-wrapper">
            {countriesList}
        </ul>
    </div>
  );
};

export default TableComponent;