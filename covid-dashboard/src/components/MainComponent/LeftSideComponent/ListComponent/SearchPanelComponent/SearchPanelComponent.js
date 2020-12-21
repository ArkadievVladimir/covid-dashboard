import React, { useState } from 'react';
import './SearchPanelComponent.css';

const SearchPanelComponent = ({onSearch}) => {

    const [temp, setTemp] = useState('');

    function onSearchChange(e) {
        const temp = e.target.value;
        setTemp(temp);
        onSearch(temp);
    };

    return (
        <input type="text"
            className="search-input"
            placeholder="Type to search country" 
            value={temp} 
            onChange={ onSearchChange }/>  
    );
};

export default SearchPanelComponent;
