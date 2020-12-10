import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Alerts from '../utils/Alerts';

import {
  Section,
  Wrapper,
  FormContainer,
  Flex,
  H1,
  Back,
  Button,
  InputEmail,
  InputPassword,
  InputFirstName,
  InputDays,
  InputYears,
  SelectMonths,
  Label,
} from '../css/styled/Subscribe/styled';

const Subscribe = (props) => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  const [next, setNext] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
    password2: '',
    firstName: '',
    birthdate: { days: '', months: '', years: '' },
  });

  const { email, password, password2, firstName, birthdate } = user;
  const { days, months, years } = user.birthdate;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Email already exists') {
      setAlert('Email déjà existante.', 'red');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      birthdate: {
        ...user.birthdate,
        [e.target.name]: e.target.value,
      },
    });
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const nextForm = (e) => {
    e.preventDefault();
    // first Sign up page checking
    if (!emailIsValid(email))
      return setAlert('Cette adresse e-mail est invalide', 'red');
    if (password.length < 6 || password2.length < 6)
      return setAlert('Le mot de passe doit faire plus de 6 caractères', 'red');
    if (password === '' && password2 === '')
      return setAlert('Le mot de passe ne peut pas être vide', 'red');
    if (password !== password2)
      return setAlert('Les deux mots de passe ne correspondent pas', 'red');

    // Everything success then we can go next form
    setNext(!next);
  };

  const submitForm = (e) => {
    e.preventDefault();
    // Checking 2nd part of the form
    if (firstName.length < 1)
      return setAlert('Le Nom doit avoir plus de 1 caractère', 'red');
    if (birthdate.months === 'Month' || birthdate.months === '')
      return setAlert('Vous devez choisir un mois', 'red');
    if (birthdate.days > 31)
      return setAlert('Le Jour ne peut pas être plus grand que 31', 'red');
    if (birthdate.days < 1)
      return setAlert('Le Jour ne peut pas être plus petit que 1', 'red');
    if (birthdate.years > 2021)
      return setAlert('Vous ne pouvez pas être naît dans le futur', 'red');
    if (birthdate.years < 1900)
      return setAlert(
        'Mmmmh allez vous inscrire dans le livre des records, du plus vieux Humain',
        'red'
      );

    //Everything is fine ! Let's add this User to our DB
    register({
      email,
      password,
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      birthdate: { days, months, years },
    });
  };

  const subscribeForm = (
    <Section>
      <Wrapper>
        <H1>Inscription</H1>
        <Alerts />
        {next ? (
          <>
            <FormContainer onSubmit={submitForm}>
              <Label>Prénom :</Label>

              <Flex>
                <InputFirstName
                  id='firstName'
                  type='text'
                  name='firstName'
                  value={firstName.charAt(0).toUpperCase() + firstName.slice(1)}
                  onChange={onChange}
                  autoFocus
                />
              </Flex>
              <Label>Quand est-ce votre anniversaire ? </Label>
              <Flex
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  justifyContent: 'center',
                }}
              >
                <InputDays
                  id='days'
                  name='days'
                  value={birthdate.days}
                  placeholder='JJ'
                  onChange={onChange}
                />
                <SelectMonths
                  id='months'
                  name='months'
                  value={birthdate.months}
                  onChange={onChange}
                >
                  <option>Mois</option>
                  <option>Janvier</option>
                  <option>Février</option>
                  <option>Mars</option>
                  <option>Avril</option>
                  <option>Mai</option>
                  <option>Juin</option>
                  <option>Juillet</option>
                  <option>Août</option>
                  <option>Septembre</option>
                  <option>Octobre</option>
                  <option>Novembre</option>
                  <option>Décembre</option>
                </SelectMonths>
                <InputYears
                  id='years'
                  name='years'
                  value={birthdate.years}
                  placeholder='AAAA'
                  onChange={onChange}
                />
              </Flex>

              <Button name='submit' onClick={submitForm}>
                Continuer
              </Button>
            </FormContainer>
            <Back name='back' onClick={nextForm}>
              Retour
            </Back>
          </>
        ) : (
          <FormContainer onSubmit={nextForm}>
            <Label>E-mail :</Label>
            <Flex>
              <InputEmail
                id='email'
                type='email'
                name='email'
                value={email}
                onChange={onChange}
              />
            </Flex>
            {/* <Label onClick={deleteall}>Delete</Label> */}
            <Label>Mot de passe :</Label>
            <Flex>
              <InputPassword
                id='password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </Flex>

            <Label>Confirmation du mot de passe :</Label>
            <Flex>
              <InputPassword
                id='password2'
                type='password'
                name='password2'
                value={password2}
                onChange={onChange}
              />
            </Flex>
            <Button name='next' onClick={nextForm}>
              Suivant
            </Button>
          </FormContainer>
        )}
      </Wrapper>
    </Section>
  );

  return <>{subscribeForm}</>;
};

export default Subscribe;
