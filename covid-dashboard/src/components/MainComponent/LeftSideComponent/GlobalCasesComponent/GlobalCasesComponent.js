import React, { useState } from 'react';
import './GlobalCasesComponent.css';
import GlobalCasesStatComponent from './GlobalCasesStatComponent/index';


const GlobalCasesComponent = ({global}) => {
  return ( 
    <div className="global-cases-wrapper">
        <GlobalCasesStatComponent {...global }/>
    </div>  
  );
};

export default GlobalCasesComponent;
