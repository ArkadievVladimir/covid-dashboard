import React from 'react';
import './HeaderComponent.css';
import HeaderLogoComponent from './HeaderLogoComponent/index';
import HeaderTitleComponent from './HeaderTitleComponent/index';
import HeaderBurgerComponent from './HeaderBurgerComponent/index';

const HeaderComponent = () => {
   return (
        <header className="header-wrapper">
            <HeaderLogoComponent />
            <HeaderTitleComponent />
            <HeaderBurgerComponent />
        </header>
    );
};

export default HeaderComponent;