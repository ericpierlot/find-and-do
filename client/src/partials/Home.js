import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "../utils/PrivateRoute";
import AdminRoute from "../utils/AdminRoute";
import Spinner from "../utils/components/Spinner";

const AdminExperience = React.lazy(() =>
  import("../pages/admin/AdminExperience")
);
const AdminUsers = React.lazy(() => import("../pages/admin/AdminUsers"));
const Admin = React.lazy(() => import("../pages/admin/"));
const MyProfil = React.lazy(() => import("../pages/myprofil/MyProfil"));
const BoiteEnvoi = React.lazy(() =>
  import("../pages/messagerie/components/Envoi")
);
const BoiteReception = React.lazy(() =>
  import("../pages/messagerie/components/Reception")
);
const Messagerie = React.lazy(() => import("../pages/messagerie/Messagerie"));
const ExperienceById = React.lazy(() =>
  import("../pages/experience/components/ExperienceById")
);
const ExperienceManage = React.lazy(() =>
  import("../pages/experience/ExperienceManage")
);
const ExperienceCreate = React.lazy(() =>
  import("../pages/experience/ExperienceCreate")
);
const Experiences = React.lazy(() => import("../pages/Experiences"));
const Preferences = React.lazy(() => import("../pages/profil/Preferences"));
const LoginAndSecurity = React.lazy(() =>
  import("../pages/profil/LoginAndSecurity")
);
const Personal = React.lazy(() => import("../pages/profil/Personal"));
const Profil = React.lazy(() => import("../pages/Profil"));
const Subscribe = React.lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/Subscribe")
);
const Login = React.lazy(() =>
  import(/* webpackPrefetch: true */ "../pages/Login")
);
const MainHome = React.lazy(() => import("../pages/MainHome"));

const Home = () => {
  return (
    <>
      <React.Suspense fallback={<Spinner size={true} />}>
        <Switch>
          <Route exact path="/" component={MainHome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/subscribe" component={Subscribe} />
          <AdminRoute exact path="/admin" component={Admin} />
          <AdminRoute
            exact
            path="/admin/experiences"
            component={AdminExperience}
          />
          <AdminRoute exact path="/admin/utilisateurs" component={AdminUsers} />
          <PrivateRoute exact path="/profil" component={Profil} />
          <PrivateRoute
            exact
            path="/profil/personal-info"
            component={Personal}
          />
          <PrivateRoute
            exact
            path="/profil/login-and-security"
            component={LoginAndSecurity}
          />
          <PrivateRoute
            exact
            path="/profil/preferences"
            component={Preferences}
          />
          <PrivateRoute
            exact
            path="/profil/messagerie"
            component={Messagerie}
          />
          <PrivateRoute
            exact
            path="/profil/messagerie/reception"
            component={BoiteReception}
          />
          <PrivateRoute
            exact
            path="/profil/messagerie/envoi"
            component={BoiteEnvoi}
          />
          <PrivateRoute exact path="/profil-user/:id" component={MyProfil} />
          <Route exact path="/experiences" component={Experiences} />
          <PrivateRoute
            exact
            path="/experience-create"
            component={ExperienceCreate}
          />
          <PrivateRoute
            exact
            path="/experience-manage/:id"
            component={ExperienceManage}
          />
          <Route exact path="/experiences/id/:id" component={ExperienceById} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default Home;
