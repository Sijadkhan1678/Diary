import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {setupServer} from './backend/mirage/server'
import store from './store'
import {BrowserRouter} from 'react-router-dom'

if(process.env.NODE_ENV === 'development'){
  setupServer()
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
  <Provider store={store}
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>  
  </React.StrictMode>
);

