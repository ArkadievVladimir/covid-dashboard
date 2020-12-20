import React from 'react';
import './ListComponent.css';

const ListComponent = ({countries}) => {
    const countriesList = countries.map((item) => {
    const state = {
        id: item.id,
        countryTotalCases: item.TotalConfirmed,
        countryName: item.Country,
        ...item
    }

      return (
        <li key={state.id} className="cases-wrapper">
          <span className="country-stat-wrapper">{state.countryTotalCases}</span>
          <span className="country-wrapper">{state.countryName}</span>
          <div className="country-flag-wrapper"><img src={state.flag} alt="flag" className="country-flag"></img></div>
        </li>
      )   
  });
    return (
        <div className="list-wrapper">
            <h2>Cases by Country/Region/Sovereignity</h2>
            <ul className="lists-wrapper">
                {countriesList}
            </ul>
        </div>
    );
};

export default ListComponent;