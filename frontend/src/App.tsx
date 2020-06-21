import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import AppProvider from './hooks';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/Global';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <GlobalStyles />
        <ToastContainer autoClose={3000} />
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
