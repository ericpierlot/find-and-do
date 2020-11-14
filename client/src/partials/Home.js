import React from 'react';
import { Route, Switch } from 'react-router-dom';

import styled from 'styled-components';
import MainHome from '../pages/MainHome';
import Login from '../pages/Login';
import Subscribe from '../pages/Subscribe';
import Profil from '../pages/Profil';

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
      </Switch>
    </Section1>
  );
};

export default Home;
