import React from 'react';
import { ToastContainer } from 'react-toastify';

import Routes from './routes';
import AppProvider from './hooks';

import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './styles/Global';

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <ToastContainer autoClose={3000} />
      <Routes />
    </AppProvider>
  );
}

export default App;
