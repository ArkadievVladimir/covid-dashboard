import React from 'react';
import './LeftSideComponent.css';
import GlobalCasesComponent from './GlobalCasesComponent/index';
import ListComponent from './ListComponent/index';

const LeftSideComponent = () => {
    return (
        <div className="left-side-component-wrapper">
            <GlobalCasesComponent />
            <ListComponent />
        </div>
    );
};

export default LeftSideComponent;
