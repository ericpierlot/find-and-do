import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';

import Header from './partials/Header';
import Home from './partials/Home';
import Footer from './partials/Footer';
import './css/style.css';

const App = () => {
  return (
    <AuthState>
      <AlertState>
        <BrowserRouter>
          {/*  Header */}
          <Header />
          {/* ----------- */}
          <Home />
          {/* -------------- */}
          <Footer />
          {/* Footer */}
        </BrowserRouter>
      </AlertState>
    </AuthState>
  );
};

export default App;
