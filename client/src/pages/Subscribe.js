import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../context/alert/alertContext';
import AuthContext from '../context/auth/authContext';
import Alerts from '../utils/Alerts';
import axios from 'axios';
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
  InputCity,
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
    city: '',
    birthDate: {
      years: '',
      months: '',
      days: '',
    },
  });

  const { email, password, password2, firstName, city, birthDate } = user;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'Email already exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      birthDate: {
        ...user.birthDate,
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
    if (!emailIsValid(email)) return setAlert('Email invalid', 'danger');
    if (password.length < 6 || password2.length < 6)
      return setAlert('Password must be longer than 6 caracters', 'danger');
    if (password === '' && password2 === '')
      return setAlert('Password cannot be empty', 'danger');
    if (password !== password2)
      return setAlert("Passwords doesn't match", 'danger');

    // Everything success then we can go next form
    setNext(!next);
  };

  const submitForm = (e) => {
    e.preventDefault();
    // Checking 2nd part of the form
    if (firstName.length < 1)
      return setAlert(
        'Cannot have a first name shorter than one caracter',
        'danger'
      );
    if (city === '') return setAlert('City cannot be empty', 'danger');
    if (birthDate.months === 'Month' || birthDate.months === '')
      return setAlert('You have to choose a month', 'danger');
    if (birthDate.days > 31)
      return setAlert('Day cannot be bigger than 31', 'danger');
    if (birthDate.days < 1)
      return setAlert('Day cannot be less than 1', 'danger');
    if (birthDate.years > 2021)
      return setAlert('You cannot be born in the future', 'danger');
    if (birthDate.years < 1900)
      return setAlert(
        'Mmmmh you should go to the World books for older Human',
        'danger'
      );

    //Everything is fine ! Let's add this User to our DB
    register({
      email,
      password,
      firstName,
      city,
      birthDate,
    });
  };

  // Just for clean every experiences quickly
  const deleteall = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      await axios.put('/api/experiences/deleteAll', config);
    } catch (error) {
      console.log('eerooreoorororr');
    }

    try {
      await axios.delete('/api/experiences/clean', config);
    } catch (error) {
      console.log('eerooreoorororr');
    }
  };

  const subscribeForm = (
    <Section>
      <Wrapper>
        <H1>Sign up</H1>
        <Alerts />
        {next ? (
          <>
            <FormContainer onSubmit={submitForm}>
              <Label>First name :</Label>

              <Flex>
                <InputFirstName
                  id='firstName'
                  type='text'
                  name='firstName'
                  value={firstName}
                  onChange={onChange}
                  autoFocus
                />
              </Flex>
              <Label>Your city :</Label>
              <Flex>
                <InputCity
                  id='city'
                  type='text'
                  name='city'
                  value={city}
                  onChange={onChange}
                />
              </Flex>
              <Label>When it's your birthday ?</Label>
              <Flex
                style={{
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  margin: 'auto',
                }}
              >
                <SelectMonths
                  id='months'
                  name='months'
                  value={birthDate.months}
                  onChange={onChange}
                >
                  <option>Month</option>
                  <option>January</option>
                  <option>February</option>
                  <option>March</option>
                  <option>April</option>
                  <option>May</option>
                  <option>June</option>
                  <option>July</option>
                  <option>August</option>
                  <option>September</option>
                  <option>October</option>
                  <option>November</option>
                  <option>December</option>
                </SelectMonths>
                <InputDays
                  id='days'
                  name='days'
                  value={birthDate.days}
                  placeholder='DD'
                  onChange={onChange}
                />
                <InputYears
                  id='years'
                  name='years'
                  value={birthDate.years}
                  placeholder='YYYY'
                  onChange={onChange}
                />
              </Flex>

              <Button name='submit' onClick={submitForm}>
                Continue
              </Button>
            </FormContainer>
            <Back name='back' onClick={nextForm}>
              Back
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
            <Label onClick={deleteall}>Delete</Label>
            <Label>Password :</Label>
            <Flex>
              <InputPassword
                id='password'
                type='password'
                name='password'
                value={password}
                onChange={onChange}
              />
            </Flex>

            <Label>Password confirm :</Label>
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
              Next
            </Button>
          </FormContainer>
        )}
      </Wrapper>
    </Section>
  );

  return <>{subscribeForm}</>;
};

export default Subscribe;
