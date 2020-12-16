import React from 'react';
import './MainComponent.css';
import LeftSideComponent from './LeftSideComponent/index';
import RightSideComponent from './RightSideComponent/index';
import MapComponent from './MapComponent/index';

const MainComponent = () => {



    return (
        <section className="main-wrapper">
                <LeftSideComponent />
                <MapComponent />
                <RightSideComponent />
        </section>
    );
};

export default MainComponent;