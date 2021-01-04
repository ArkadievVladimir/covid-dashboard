import React, { useEffect, useState } from 'react';
import './App.css';
import HeaderComponent from '../HeaderComponent/index';
import MainComponent from '../MainComponent/index';
import FooterComponent from '../FooterComponent/index';
import { covidStatState } from '../InitialStateComponent/index';

const App = () => {
  const [state, setState] = useState(null);
  const [countriesStat, setCountriesStat] = useState([]);
  const [globalStat, setGlobalStat] = useState([]);
  const [countryHistoryStat, setCountryHistoryStat] = useState([1,1]);
  const [globalHistoryStat, setGlobalHistoryStat] = useState([]);
  const [value, setValue] = useState('Total confirmed');
  const [activeCountry, setActiveCountry] = useState(null);
  useEffect(() => {
    let isMounted = false;
      covidStatState()
        .then((res) => {
          if(!isMounted) {
            setState(res);
            setCountriesStat(res.countriesStat);
            setGlobalStat(res.globalStat);
            setGlobalHistoryStat(res.historyData)
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
      globalHistory={globalHistoryStat}
      stat={value}
      activeCountry={activeCountry}
      setActiveCountry={setActiveCountry}
      setCountryHistoryStat={setCountryHistoryStat}
      countryHistoryStat={countryHistoryStat}
    />
    <FooterComponent />
    </>
  );
}
export default App;
