import React from 'react';
import './MainComponent.css';
import LeftSideComponent from './LeftSideComponent/index';
import RightSideComponent from './RightSideComponent/index';
import MapComponent from './MapComponent/index';

const MainComponent = ({global, countries, stat}) => {



    return (
        <section className="main-wrapper">
                <LeftSideComponent global={global}
                 countries={countries}
                 stat={stat}/>
                <MapComponent countries={countries}
                 stat={stat}/>
                <RightSideComponent stat={stat}/>
        </section>
    );
};

export default MainComponent;