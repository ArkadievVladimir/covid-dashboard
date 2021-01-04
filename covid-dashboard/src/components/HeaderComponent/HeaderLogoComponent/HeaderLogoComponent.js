import React from 'react';
import './HeaderLogoComponent.css';

const HeaderLogoComponent = () => {
    return (
        <div className="jh-logo-wrapper">
            <a href="https://coronavirus.jhu.edu/map.html"><img src="./covid-dashboard.jpg" alt="jh-logo" className="jh-logo-img"></img></a>
        </div>
    );
};

export default HeaderLogoComponent;