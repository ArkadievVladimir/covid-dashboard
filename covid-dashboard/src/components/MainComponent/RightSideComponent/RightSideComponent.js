import React from 'react';
import './RightSideComponent.css';
import TableComponent from './TableComponent/index';
import ChartComponent from './ChartComponent/index';

const RightSideComponent = ({stat, activeCountry, globalHistory, countryHistoryStat, countries, global}) => {

  //test data
  // let data = [];
  // let visits = 10;
  // for (let i = 1; i < 366; i++) {
  //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
  //   data.push({ date: new Date(2019, 0, i), value: visits });
  // }
 
  return (
    <div className='right-side-component-wrapper'>
      <TableComponent global={global}
      stat={stat}
      activeCountry={activeCountry}
      countries={countries}/>
      <ChartComponent stat={stat}
      activeCountry={activeCountry}
      globalHistory={globalHistory}
      countryHistoryStat={countryHistoryStat}/>
    </div>
  );
};

export default RightSideComponent;