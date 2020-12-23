import React, { useState } from 'react';
import './StatListComponent.css';

const StatListComponent = ({setValue}) => {
    // const [checked, setChecked] = useState(false);

    function setItemChecked() {
        // setChecked(!checked);
        const inputs = document.querySelectorAll('.stat');
        let selectedInputIndex;
        inputs.forEach((input) => {
            if (input.checked === true) {
                selectedInputIndex = input.value;
            }
        });
        setValue(selectedInputIndex);
    };

    return (
        <div className="header-form-wrapper">
            <form action="#" className="header-form-btns-wrapper">
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Total confirmed"  defaultChecked={true} onChange={setItemChecked}></input>
                    <span>Total Confirmed</span>
                    </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Total recovered"  onChange={setItemChecked}></input>
                    <span>Total Recovered</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Total deaths" onChange={setItemChecked}></input>
                    <span>Total Deaths</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="New confirmed" onChange={setItemChecked}></input>
                    <span>New Confirmed</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="New recovered" onChange={setItemChecked}></input>
                    <span>New Recovered</span>
                </div>
                <div className="btn-wrapper">C
                    <input className="stat" name="stat" type="radio" value="New deaths" onChange={setItemChecked}></input>
                    <span>New Deaths</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Global cases per 100 thousand" onChange={setItemChecked}></input>
                    <span>Total Cases Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Global recovered per 100 thousand" onChange={setItemChecked}></input>
                    <span>Total Recovered Per 100 Thousand</span>
                </div>
                <div className="stat" className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="Global deaths per 100 thousand" onChange={setItemChecked}></input>
                    <span>Total Deathes Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="New global cases per 100 thousand" onChange={setItemChecked}></input>
                    <span>New Cases Per100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="New global recovered per 100 thousand" onChange={setItemChecked}></input>
                    <span>New Recovered Per 100 Thousand</span>
                </div>
                <div className="btn-wrapper">
                    <input className="stat" name="stat" type="radio" value="New global deaths per 100 thousand" onChange={setItemChecked}></input>
                    <span>New Deaths Per 100 Thousand</span>
                </div>
            </form> 
        </div>
    )
}

export default StatListComponent;
