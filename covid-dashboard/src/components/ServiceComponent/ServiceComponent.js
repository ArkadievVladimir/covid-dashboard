import React from 'react';

export default class CovidService {

    async getResource(url) {
      const response = await fetch(url);
    
      if(!response.ok) {
        throw new Error(`Could not fetch ${url}` +
        ` , received ${response.status}`);
      };
    
      const body = await response.json();
      return body;
    };
  
    getAllCases() { //A summary of new and total cases per country updated daily.
      return this.getResource(`https://api.covid19api.com/summary`);
    };
  
    async getAllCountriesPopulationAndFlags() { // Population and Flags
      const response = await this.getResource(`https://restcountries.eu/rest/v2/all?fields=name;population;flag`);

      return response;
    };
}
