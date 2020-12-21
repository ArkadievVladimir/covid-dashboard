import React, { useState } from 'react';
import './StatListComponent.css';

const StatListComponent = ({setValue}) => {
    // const [checked, setChecked] = useState(false);

    function setItemChecked() {
        // setChecked(!checked);
        const inputs = document.querySelectorAll('.stat');
        let selectedInputIndex;
        inputs.forEach((input, index) => {
            if (input.checked === true) {
                selectedInputIndex = index;
            }
        });
        setValue(selectedInputIndex);
    };

    return (
        <div className="header-form-wrapper">
            <form action="#" className="header-form-btns-wrapper">
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalConfirmed"  defaultChecked={true} onChange={setItemChecked}></input>
                    <span>Total Confirmed</span>
                    </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalRecovered"  onChange={setItemChecked}></input>
                    <span>Total Recovered</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalDeaths" onChange={setItemChecked}></input>
                    <span>Total Deaths</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="NewConfirmed" onChange={setItemChecked}></input>
                    <span>New Confirmed</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="NewRecovered" onChange={setItemChecked}></input>
                    <span>New Recovered</span>
                </div>
                <div className="btn-wrapper">C
                    <input className="stat" name="stat" type="radio" value="NewDeaths" onChange={setItemChecked}></input>
                    <span>New Deaths</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalCasesPer100Thousand" onChange={setItemChecked}></input>
                    <span>Total Cases Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalRecoveredPer100Thousand" onChange={setItemChecked}></input>
                    <span>Total Recovered Per 100 Thousand</span>
                </div>
                <div className="stat" className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="TotalDeathesPer100Thousand" onChange={setItemChecked}></input>
                    <span>Total Deathes Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="NewCasesPer100Thousand" onChange={setItemChecked}></input>
                    <span>New Cases Per100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="NewRecoveredPer100Thousand" onChange={setItemChecked}></input>
                    <span>New Recovered Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="NewDeathsPer100Thousand" onChange={setItemChecked}></input>
                    <span>New Deaths Per 100 Thousand</span>
                </div>
            </form> 
        </div>
    )
}

export default StatListComponent;
