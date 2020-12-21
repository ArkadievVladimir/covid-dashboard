import React, { useState, useEffect } from 'react';
import './GlobalCasesStatComponent.css';

const GlobalCasesStatComponent = ( global ) => {
    const headers = Object.keys(global);
    const newHeaders = headers.map((header) => {
        return header.replace(/([a-z])([A-Z])/g, '$1 $2');
    });
    const stats = Object.values(global);
    const [value, setValue] = useState(0)
    const [index, setIndex] = useState(value);
    const [currentHeader, setCurrentHeader] = useState(null);
    const [currentStat, setCurrentStat] = useState(null);
    

    useEffect(() => {
        setIndex(0);
        setCurrentHeader(newHeaders[index]);
        setCurrentStat(stats[index]);      
    }, [global]);

    useEffect(() => {
        setIndex(value);
        setCurrentHeader(newHeaders[value]);
        setCurrentStat(stats[value])
    }, [value])

    function nextCase() {
        const newValue = index < 11 ? index + 1 : 0;
        setValue(newValue);
    };

    function prevCase() {
        const newValue = index === 0 ? 11 : index - 1;
        setValue(newValue);
    };
    
    return (
        <div className="global-case-wrapper">
            <h2>{ currentHeader }</h2>
            <div className="stat-wrapper">
                <div onClick={ prevCase }>&#8249;</div>
                <span>{ currentStat }</span>
                <div onClick={ nextCase }>&#8250;</div>
            </div>
        </div>
    );
};

export default GlobalCasesStatComponent;