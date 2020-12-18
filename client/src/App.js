import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './css/GlobalStyles';
import { lightTheme, darkTheme } from './css/Themes';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import ExperienceState from './context/experience/ExperienceState';

import Header from './partials/Header';
import Home from './partials/Home';
import Footer from './partials/Footer';
//import './css/style.css';

const App = () => {
  const [theme, setTheme] = useState(
    window.localStorage.find_and_do_theme === 'dark' ? 'dark' : 'light'
  );
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AuthState>
        <AlertState>
          <ExperienceState>
            <BrowserRouter>
              {/*  Header */}
              <Header theme={theme} setTheme={setTheme} />
              {/* ----------- */}
              <Home />
              {/* -------------- */}
              <Footer />
              {/* Footer */}
            </BrowserRouter>
          </ExperienceState>
        </AlertState>
      </AuthState>
    </ThemeProvider>
  );
};

export default App;
