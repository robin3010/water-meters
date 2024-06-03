import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './scrollbar.css';
import App from 'App';
import StoreProvider from 'store/storeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
