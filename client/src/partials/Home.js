import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import MainHome from '../pages/MainHome';
import Login from '../pages/Login';
import Subscribe from '../pages/Subscribe';
import Profil from '../pages/Profil';
import Personal from '../pages/profil/Personal';
import LoginAndSecurity from '../pages/profil/LoginAndSecurity';
import Preferences from '../pages/profil/Preferences';

import PrivateRoute from '../utils/PrivateRoute';

// const Flex = styled.article`
//   display: flex;
//   flex-direction: column;
//   overflow: hidden;
//   min-height: 100vh;
// `;

const Section1 = styled.section`
  display: flex;
  min-height: 100vh;
`;

const Home = () => {
  return (
    <Section1>
      <Switch>
        <Route exact path='/' component={MainHome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/subscribe' component={Subscribe} />
        <PrivateRoute exact path='/profil' component={Profil} />
        <PrivateRoute exact path='/profil/personal-info' component={Personal} />
        <PrivateRoute
          exact
          path='/profil/login-and-security'
          component={LoginAndSecurity}
        />
        <PrivateRoute
          exact
          path='/profil/preferences'
          component={Preferences}
        />
      </Switch>
    </Section1>
  );
};

export default Home;
