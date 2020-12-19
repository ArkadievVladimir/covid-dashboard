import React from 'react';
import './LeftSideComponent.css';
import GlobalCasesComponent from './GlobalCasesComponent/index';
import ListComponent from './ListComponent/index';

const LeftSideComponent = ({global, countries}) => {
    return (
        <div className="left-side-component-wrapper">
            <GlobalCasesComponent global={global}/>
            <ListComponent  countries={countries}/>
        </div>
    );
};

export default LeftSideComponent;
