import React from 'react';
import './StatListComponent.css';

const StatListComponent = ({setValue}) => {
    function setItemChecked() {
        function getSelectedInput(inputClass) {
            const inputs = document.querySelectorAll(`.${inputClass}`);
            let getSelectedCheckbox;
            inputs.forEach((input) => {
                if (input.checked) {
                    getSelectedCheckbox = input.value;
                }
            });
            return getSelectedCheckbox;
        }
        const checkbox = document.querySelector(`.count`);
        let getSelectedCheckbox = '';
        if (checkbox.checked) {
           getSelectedCheckbox = checkbox.value;
        }
        const mode = `${getSelectedInput('period')} ${getSelectedInput('metric')}${getSelectedCheckbox}`;
        setValue(mode);
    };
    return (
        <div className="header-form-wrapper">
            <form action="#" className="header-form-btns-wrapper">
                <div class="wrapper-metric">
                    <div className="btn-wrapper">
                        <input className="metric" name="metric" type="radio" value="confirmed" defaultChecked={true} onChange={setItemChecked}></input>
                        <span>Confirmed</span>
                    </div>
                    <div className="btn-wrapper">
                        <input className="metric" name="metric" type="radio" value="recovered" onChange={setItemChecked}></input>
                        <span>Recovered</span>
                    </div>
                    <div className="btn-wrapper">
                        <input className="metric" name="metric" type="radio" value="deaths" onChange={setItemChecked}></input>
                        <span>Deaths</span>
                    </div>
                </div>
                <div class="wrapper-period">
                    <div className="btn-wrapper">
                        <input className="period" name="period" type="radio" value="Total" defaultChecked={true} onChange={setItemChecked}></input>
                        <span>Total</span>
                    </div>
                    <div className="btn-wrapper">
                        <input className="period" name="period" type="radio" value="New" onChange={setItemChecked}></input>
                        <span>Day change</span>
                    </div>
                </div>
                <div class="wrapper-count">
                    <div className="btn-wrapper">
                        <input className="count" name="count" type="checkbox" value=" per 100 thousand" onClick={setItemChecked}></input>
                        <span>Per 100 thousand</span>
                    </div>
                </div>
            </form> 
        </div>
    );
}
export default StatListComponent;
