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
  
    getAllCases() {
      return this.getResource(`https://api.covid19api.com/summary`);
    };
  
    async getAllCountriesPopulationAndFlags() {
      const response = await this.getResource(`https://restcountries.eu/rest/v2/all?fields=name;population;flag;alpha2Code`);

      return response;
    };
}
