import React, { Component } from 'react';
import './GlobalCasesComponent.css';
// import covidStatState from '../../../InitialStateComponent/index';
import CovidService from '../../../ServiceComponent/index';

export default class GlobalCasesComponent extends Component {

  service = new CovidService();

  state = {
     statisticNameCases: null
  };

  constructor() {
    super();
    this.updateStatisctic();
  }

  updateStatisctic() {
    this.service
      .getAllCases()
      .then((response) => {
        this.setState({
          statisticNameCases: response.Global.TotalConfirmed
        })
      })
  }

  render() {
    const { statisticNameCases } = this.state;

    return (
      <div className="global-cases-wrapper">
        <h2>Global Cases</h2>
        <span>{statisticNameCases}</span>
      </div>
    );
  }   
};
