import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "./Context"

import "./styles/reset.css"
import "./styles/global.css"


ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
