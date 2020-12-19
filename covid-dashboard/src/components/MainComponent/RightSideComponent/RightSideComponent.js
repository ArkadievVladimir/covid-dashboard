import React from 'react';
import './RightSideComponent.css';
import TableComponent from './TableComponent/index';
import ChartComponent from './ChartComponent/index';

const RightSideComponent = () => {

  //test data
  let data = [];
  let visits = 10;
  for (let i = 1; i < 366; i++) {
    visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 100);
    data.push({ date: new Date(2019, 0, i), value: visits });
  }
 
  return (
    <div className='right-side-component-wrapper'>
      <TableComponent />
      <ChartComponent data={data}/>
    </div>
  );
};

export default RightSideComponent;