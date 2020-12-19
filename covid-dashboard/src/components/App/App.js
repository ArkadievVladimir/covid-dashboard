import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderComponent from '../HeaderComponent/index';
import MainComponent from '../MainComponent/index';
import FooterComponent from '../FooterComponent/index';
import covidStatState from '../InitialStateComponent/index';

const App = () => {
    
    const [state, setState] = useState({});
    const [countriesStat, setCountriesStat] = useState([]);
    const [globalStat, setGlobalStat] = useState([])

    useEffect(() => {   
        let isMounted = false;
            covidStatState()
                .then((res) => {
                    if(!isMounted) {
                        setState(res);
                        setCountriesStat(res.countriesStat);
                        setGlobalStat(res.globalStat)
                    }
                });
            return () => {
                isMounted = true
            };
    }, []);

    return (
        <>
        <HeaderComponent />
        <MainComponent global={globalStat} countries={countriesStat}/>
        <FooterComponent />
        </>
    )  
}

export default App;
