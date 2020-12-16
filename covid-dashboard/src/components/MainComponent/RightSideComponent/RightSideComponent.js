import React from 'react';
import './RightSideComponent.css';
import TableComponent from './TableComponent/index';
import ChartComponent from './ChartComponent/index';

const RightSideComponent = () => {
    return (
        <div className="right-side-component-wrapper">
            <TableComponent />
            <ChartComponent />
        </div>
    );
};

export default RightSideComponent;