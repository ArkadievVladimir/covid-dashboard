import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/index';

const body = document.querySelector('body');
body.style.overflowY = "hidden";

ReactDOM.render(<App />,
  document.getElementById('root'));
