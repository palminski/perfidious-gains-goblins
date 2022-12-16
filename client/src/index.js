import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
// testing out checkbox 

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  
  <React.StrictMode>
    <link //for Bootstrap
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
      crossOrigin="anonymous"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
