import React from 'react';
import './MainComponent.css';
import LeftSideComponent from './LeftSideComponent/index';
import RightSideComponent from './RightSideComponent/index';
import MapComponent from './MapComponent/index';

const MainComponent = (
    {
        global, 
        countries, 
        stat, 
        activeCountry, 
        setActiveCountry, 
        globalHistory, 
        setCountryHistoryStat,
        countryHistoryStat
    }) => {

    return (
        <section className="main-wrapper">
                <LeftSideComponent global={global}
                 countries={countries}
                 stat={stat}
                 activeCountry={activeCountry}
                 setActiveCountry={setActiveCountry}
                 setCountryHistoryStat={setCountryHistoryStat}/>
                <MapComponent countries={countries}
                 stat={stat}
                 activeCountry={activeCountry}
                 setActiveCountry={setActiveCountry}
                 setCountryHistoryStat={setCountryHistoryStat}/>
                <RightSideComponent stat={stat}
                global={global}
                countries={countries}
                activeCountry={activeCountry}
                globalHistory={globalHistory}
                countryHistoryStat={countryHistoryStat}/>
        </section>
    );
};

export default MainComponent;
