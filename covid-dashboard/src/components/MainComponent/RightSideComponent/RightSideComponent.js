import React from 'react';
import './RightSideComponent.css';
import TableComponent from './TableComponent/index';
import ChartComponent from './ChartComponent/index';

const RightSideComponent = ({stat, activeCountry, globalHistory, countryHistoryStat, countries, global}) => {
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
