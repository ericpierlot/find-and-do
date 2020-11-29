import React, { useState, useEffect, useContext } from 'react';

import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';
import Alerts from '../utils/Alerts';

import { Link } from 'react-router-dom';
import {
  Section,
  Wrapper,
  FormContainer,
  H1,
  Button,
  InputEmail,
  InputPassword,
  Label,
} from '../css/styled/Login/styled';

const Login = (props) => {
  // Declare my useContext hooks
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;
  // Declare my useState hooks
  const [isFormSended, setIsFormSended] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = user;

  //UseEffect to do my fetching to my DataBase right after the user send the form.

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Email not found') {
      setAlert('Ces identifiants ne correspondent pas', 'red');
      clearErrors();
    }
    if (error === 'Password not match') {
      setAlert('Ces identifiants ne correspondent pas', 'red');
      clearErrors();
    }

    if (isFormSended) {
      setIsFormSended(!isFormSended);
    }
  }, [
    isFormSended,
    error,
    props.history,
    isAuthenticated,
    setAlert,
    clearErrors,
  ]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    login({
      email,
      password,
    });
    setIsFormSended(!isFormSended);
    e.preventDefault();
  };

  return (
    <Section>
      <Wrapper>
        <H1>Connexion</H1>
        <Alerts />
        <FormContainer onSubmit={onSubmitForm}>
          <Label>E-mail :</Label>

          <InputEmail
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />

          <Label>Mot de passe :</Label>
          <InputPassword
            id='password'
            name='password'
            minLength='6'
            value={password}
            onChange={onChange}
            required
          />

          <Button name='submit' type='submit' onSubmit={onSubmitForm}>
            Continuer
          </Button>
        </FormContainer>
        <span>
          Vous n'avez pas de compte ?{' '}
          <Link to='/subscribe'>Créez un compte</Link>
        </span>
      </Wrapper>
    </Section>
  );
};

export default Login;
