import React from 'react';
import './HeaderBurgerComponent.css';

const HeaderBurgerComponent = () => {
    return (
        <div className="burger-menu-wrapper">
            <a className="burger-menu-btn">
                <span className="burger-menu-lines"></span>
            </a>

            <nav className="burger-menu-nav">
                <h3>To display the full screen, select the item</h3>
                <a className="burger-menu-link">Table</a>
                <a className="burger-menu-link">List</a>
                <a className="burger-menu-link">Map</a>
                <a className="burger-menu-link">Chart</a>
                <a className="burger-menu-link">Virtual keyboard</a>
            </nav>
        </div>
    );
};

export default HeaderBurgerComponent;