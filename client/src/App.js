import React, { useState, useEffect } from 'react';
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

  const themeToggler = () => {
    if (theme === 'light') {
      setTheme('dark');
      return window.localStorage.setItem('find_and_do_theme', 'dark');
    }
    if (theme === 'dark') {
      setTheme('light');
      return window.localStorage.setItem('find_and_do_theme', 'light');
    }
  };

  useEffect(() => {
    const getFavoriteTheme = window.localStorage.getItem('find_and_do_theme');
    if (getFavoriteTheme === 'light') {
      return setTheme('light');
    }

    if (getFavoriteTheme === 'dark') {
      return setTheme('dark');
    }
  }, [theme]);

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AuthState>
        <AlertState>
          <ExperienceState>
            <BrowserRouter>
              {/*  Header */}
              <Header
                themeToggler={themeToggler}
                theme={theme}
                setTheme={setTheme}
              />
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
