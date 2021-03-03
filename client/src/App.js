import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./css/GlobalStyles";
import { lightTheme, darkTheme } from "./css/Themes";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import ExperienceState from "./context/experience/ExperienceState";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import { QueryClientProvider, QueryClient } from "react-query";
import Spinner from "./utils/components/Spinner";
//import './css/style.css';
const Home = React.lazy(() => import("./partials/Home"));

const App = () => {
  const [theme, setTheme] = useState(
    window.localStorage.find_and_do_theme === "dark" ? "dark" : "light"
  );

  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <AuthState>
          <AlertState>
            <ExperienceState>
              <BrowserRouter>
                {/*  Header */}
                <Header theme={theme} setTheme={setTheme} />
                {/* ----------- */}
                <React.Suspense fallback={<Spinner size={true} />}>
                  <Home />
                </React.Suspense>
                {/* -------------- */}
                <Footer />
                {/* Footer */}
              </BrowserRouter>
            </ExperienceState>
          </AlertState>
        </AuthState>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
