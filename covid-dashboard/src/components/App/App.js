import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderComponent from '../HeaderComponent/index';
import MainComponent from '../MainComponent/index';
import FooterComponent from '../FooterComponent/index';
import covidStatState from '../InitialStateComponent/index';

const App = () => {
    
    const [state, setState] = useState(null);
    const [countriesStat, setCountriesStat] = useState([]);
    const [globalStat, setGlobalStat] = useState([]);
    const [value, setValue] = useState(0);

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
        <HeaderComponent setValue={setValue}/>
        <MainComponent 
            global={globalStat} 
            countries={countriesStat}
            stat={value}
        />
        <FooterComponent />
        </>
    )  
}

export default App;
