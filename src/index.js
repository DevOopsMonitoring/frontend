import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

axios.defaults.baseURL = "https://devoops.w0rng.ru/";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
