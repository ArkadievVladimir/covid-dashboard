import React from 'react';
import './App.css';
import HeaderComponent from '../HeaderComponent/index';
import MainComponent from '../MainComponent/index';
import FooterComponent from '../FooterComponent/index';
import CovidService from '../ServiceComponent/index';
import covidStatState from '../InitialStateComponent/index';

const App = () => {
    return (
        <>
        <HeaderComponent />
        <MainComponent />
        <FooterComponent />
        </>
    )
}

export default App;
