import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MainHome from '../pages/MainHome';
import Login from '../pages/Login';
import Subscribe from '../pages/Subscribe';
import Profil from '../pages/Profil';
import Personal from '../pages/profil/Personal';
import LoginAndSecurity from '../pages/profil/LoginAndSecurity';
import Preferences from '../pages/profil/Preferences';
import Experiences from '../pages/Experiences';
import PrivateRoute from '../utils/PrivateRoute';
import AdminRoute from '../utils/AdminRoute';
import ExperienceCreate from '../pages/experience/ExperienceCreate';
import ExperienceManage from '../pages/experience/ExperienceManage';
import ExperienceById from '../pages/experience/components/ExperienceById';
import Messagerie from '../pages/messagerie/Messagerie';
import BoiteReception from '../pages/messagerie/components/Reception';
import BoiteEnvoi from '../pages/messagerie/components/Envoi';
import MyProfil from '../pages/myprofil/MyProfil';
import Admin from '../pages/admin';
import AdminExperience from '../pages/admin/AdminExperience';
import AdminUsers from '../pages/admin/AdminUsers';

const Home = () => {
  return (
    <>
      <Switch>
        <Route exact path='/' component={MainHome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/subscribe' component={Subscribe} />
        <AdminRoute exact path='/admin' component={Admin} />
        <AdminRoute
          exact
          path='/admin/experiences'
          component={AdminExperience}
        />
        <AdminRoute exact path='/admin/utilisateurs' component={AdminUsers} />
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
        <PrivateRoute exact path='/profil/messagerie' component={Messagerie} />
        <PrivateRoute
          exact
          path='/profil/messagerie/reception'
          component={BoiteReception}
        />
        <PrivateRoute
          exact
          path='/profil/messagerie/envoi'
          component={BoiteEnvoi}
        />
        <PrivateRoute exact path='/profil-user/:id' component={MyProfil} />
        <Route exact path='/experiences' component={Experiences} />
        <PrivateRoute
          exact
          path='/experience-create'
          component={ExperienceCreate}
        />
        <PrivateRoute
          exact
          path='/experience-manage/:id'
          component={ExperienceManage}
        />
        <Route exact path='/experiences/id/:id' component={ExperienceById} />
      </Switch>
    </>
  );
};

export default Home;
