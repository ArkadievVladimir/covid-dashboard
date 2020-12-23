import React from 'react';
import './FullScreenBtnComponent.css';

const FullScreenBtnComponent = ({onFullScreen}) => {
    return (
        <button className="full-screen-btn" onClick={onFullScreen}></button>
    );
};

export default FullScreenBtnComponent;
