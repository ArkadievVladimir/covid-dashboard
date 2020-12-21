import React from 'react';
import './HeaderComponent.css';
import HeaderLogoComponent from './HeaderLogoComponent/index';
import HeaderTitleComponent from './HeaderTitleComponent/index';
import HeaderBurgerComponent from './HeaderBurgerComponent/index';
import StatListComponent from './StatListComponent/index';

const HeaderComponent = ({setValue}) => {
    return (
        <header className="header-wrapper">
            <HeaderLogoComponent />
            <div className="header-info-wrapper">
                <HeaderTitleComponent />
                <StatListComponent setValue={setValue}/>
            </div>
            <HeaderBurgerComponent />
        </header>
    );
};

export default HeaderComponent;