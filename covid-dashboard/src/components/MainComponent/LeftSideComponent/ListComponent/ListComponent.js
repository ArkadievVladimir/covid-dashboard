import React from 'react';
import './ListComponent.css';

const ListComponent = () => {
    return (
        <div className="list-wrapper">
            <h2>Cases by Country/Region/Sovereignity</h2>
            <div className="lists-wrapper">
                <ul className="country-stat-wrapper">
                    <li>10 000 111</li>
                    <li>USA</li>
                    <li><span>f</span></li>
                </ul>
                <ul className="country-stat-wrapper">
                    <li>7 500 600</li>
                    <li>India</li>
                    <li><span>f</span></li>
                </ul>
                <ul className="country-stat-wrapper">
                    <li>6300000</li>
                    <li>Brasil</li>
                    <li><span>f</span></li>
                </ul>
            </div>
        </div>
    );
};

export default ListComponent;