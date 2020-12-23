import React from 'react';
import './LeftSideComponent.css';
import GlobalCasesComponent from './GlobalCasesComponent/index';
import ListComponent from './ListComponent/index';

const LeftSideComponent = ({global, countries, stat, activeCountry, setActiveCountry, setCountryHistoryStat}) => {
    return (
        <div className="left-side-component-wrapper">
            <GlobalCasesComponent global={global}/>
            <ListComponent  countries={countries}
            stat={stat}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            setCountryHistoryStat={setCountryHistoryStat}/>
        </div>
    );
};

export default LeftSideComponent;
