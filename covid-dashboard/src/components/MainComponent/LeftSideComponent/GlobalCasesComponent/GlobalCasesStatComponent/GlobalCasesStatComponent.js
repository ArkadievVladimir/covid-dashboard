import React, { useState, useEffect } from 'react';
import './GlobalCasesStatComponent.css';

const GlobalCasesStatComponent = ( global ) => {
    const headers = Object.keys(global);
    const stats = Object.values(global);
    const [currentHeader, setCurrentHeader] = useState(null);
    const [currentStat, setCurrentStat] = useState(null);

    useEffect(() => {
        setCurrentHeader(headers[0]);
        setCurrentStat(stats[0])
    }, [global])
    
    return (
        <div className="global-cases-wrapper">
            <h2>{ currentHeader }</h2>
            <span>{ currentStat }</span>
        </div>
    );
};

export default GlobalCasesStatComponent;