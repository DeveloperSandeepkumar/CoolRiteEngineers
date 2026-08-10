import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const container = document.getElementById('root');

if (ReactDOM.createRoot) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    container
  );
}
