import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../../utils/Alerts';
import axios from 'axios';
import {
  Button,
  InputDays,
  InputYears,
  SelectMonths,
} from '../../css/styled/Subscribe/styled';

const Section = styled.section`
  margin: auto;
  width: 100%;
  margin-top: 90px;
  margin-bottom: 45px;
  @media (max-width: 920px) {
    margin: 0;
    overflow: auto;
  }
`;
const Wrapper = styled.section`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  background-color: rgba(255, 255, 255, 0.8);

  @media (max-width: 920px) {
    min-width: 100%;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    padding: 1rem;
    :focus-within {
      box-shadow: none;
      transform: none;
    }
  }
`;

const Top = styled.header`
  width: 60%;
  margin: auto;
  padding-top: 1rem;

  @media (max-width: 920px) {
    width: 100%;
  }
`;
const Article = styled.article`
  width: 60%;
  margin: auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Flexbox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px white solid;
  padding-bottom: 80px;
  margin-top: 10px;
  @media (max-width: 920px) {
    width: 100%;
    border-bottom: 1px white solid;
  }
`;

const Modify = styled.button`
  background-color: transparent;
  height: 0;
  border: none;
  font-size: 1rem;
  color: seagreen;
  font-weight: bold;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 50%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;

  border: none;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: all 330ms ease-in-out;

  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;

const Personal = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { user, loadUser } = authContext;
  const [isClicked, setIsClicked] = useState({
    legalName: false,
    birthate: false,
    email: false,
  });
  const [newSelected, setNewSelected] = useState({
    legalName: false,
    birthate: false,
    email: false,
  });
  const { firstName, lastName, birthdate, email } = user;
  const { days, months, years } = birthdate;
  const [newUser, setNewUser] = useState({
    email,
    firstName,
    lastName,
    birthdate: {
      days,
      months,
      years,
    },
  });

  useEffect(() => {
    // In case it's Legal name asking to modify
    if (newSelected.legalName) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ legalName: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // In case it's Birthdate choose to modify
    if (newSelected.birthdate) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ birthdate: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // In case it's Email choose to modify
    if (newSelected.email) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
      };
      // newSelected value is true, (form sended) then I call my function updateUser
      updateUser();

      // Change display Modify to normal back
      setNewSelected({ email: false });
      // Change "cancel" to "modify"
      setIsClicked(false);
    }

    // eslint-disable-next-line
  }, [newSelected]);
  // When one category become true, this useEffect will be rendered then doing fetch for the properly case
  console.log('ONFLY NEWUSER : ', newUser);
  const onChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      birthdate: {
        ...newUser.birthdate,
      },
    });
  };

  const onChangeBirthdate = (e) => {
    setNewUser({
      ...newUser,
      birthdate: {
        ...newUser.birthdate,
        [e.target.name]: e.target.value,
      },
    });
  };

  const onChangeEmail = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
      birthdate: {
        ...newUser.birthdate,
      },
    });
  };

  const LegalNameSubmit = (e) => {
    e.preventDefault();
    // Have to set my alerts to throw to the user What's wrong
    if (newUser.firstName === '')
      return setAlert('Your firstname cannot be empty', 'danger');

    if (newUser.lastName === '')
      return setAlert('Your lastname cannot be empty', 'danger');

    setNewSelected({ legalName: true });
  };

  const BirthdateSubmit = (e) => {
    e.preventDefault();
    if (newUser.birthdate.months === 'Month' || newUser.birthdate.months === '')
      return setAlert('You have to choose a month', 'danger');
    if (newUser.birthdate.days > 31)
      return setAlert('Day cannot be bigger than 31', 'danger');
    if (newUser.birthdate.days < 1)
      return setAlert('Day cannot be less than 1', 'danger');
    if (newUser.birthdate.years > 2021)
      return setAlert('You cannot be born in the future', 'danger');
    if (newUser.birthdate.years < 1900)
      return setAlert(
        'Mmmmh you should go to the World books for older Human',
        'danger'
      );

    // Everything looks fine, then let's send :
    setNewSelected({ birthdate: true });
  };

  const emailIsValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const EmailSubmit = (e) => {
    e.preventDefault();
    if (!emailIsValid(email)) return setAlert('Email invalid', 'danger');

    // Everything looks fine, then let's send :
    setNewSelected({ email: true });
  };

  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Profil</Link> → Personal Info
          </h4>
          <br />
          <h2>Personal Information</h2>
        </Top>
        <Article>
          <Flexbox onSubmit={LegalNameSubmit}>
            {isClicked.legalName ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Legal Name</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked(false);
                    }}
                  >
                    Cancel
                  </div>
                </div>
                <br />
                <br />
                <div style={{ width: '100%' }}>
                  This is the name that you have on your passport or ID card or
                  License driving for example.
                </div>
                <br />
                <br />
                <div>
                  <div>
                    <label>First name : </label>
                    <Input
                      placeholder={user.firstName}
                      value={newUser.firstName}
                      onChange={onChange}
                      name='firstName'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>Last name : </label>
                    <Input
                      placeholder={user.lastName}
                      value={newUser.lastName}
                      onChange={onChange}
                      style={{ height: '2rem' }}
                      name='lastName'
                    />
                  </div>
                  <Button>Save</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Legal Name</strong>
                  <br />
                  <br />
                  {newUser.firstName}{' '}
                  {newUser.lastName ? (
                    newUser.lastName
                  ) : (
                    <strong> Last name not define, please let us know</strong>
                  )}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ legalName: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
          {/* FOR BIRTHDATE */}
          <Flexbox onSubmit={BirthdateSubmit}>
            {isClicked.birthate ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Birthdate</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked({ birthate: false });
                    }}
                  >
                    Cancel
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <SelectMonths
                      id='months'
                      name='months'
                      value={newUser.birthdate.months}
                      onChange={onChangeBirthdate}
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
                      value={newUser.birthdate.days}
                      placeholder='DD'
                      onChange={onChangeBirthdate}
                    />
                    <InputYears
                      id='years'
                      name='years'
                      value={newUser.birthdate.years}
                      placeholder='YYYY'
                      onChange={onChangeBirthdate}
                    />
                  </div>
                  <Button style={{ width: '30%' }}>Save</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Birthdate</strong>
                  <br />
                  <br />
                  Born on {newUser.birthdate.days} {newUser.birthdate.months}{' '}
                  {newUser.birthdate.years}.
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ birthate: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
          <Flexbox onSubmit={EmailSubmit}>
            {/* FOR EMAIL */}
            {isClicked.email ? (
              <>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <strong>Email</strong>

                  <div
                    style={{
                      cursor: 'pointer',
                      color: '#b62c2c',
                      textDecoration: 'underline',
                    }}
                    onClick={() => {
                      setIsClicked({ birthate: false });
                    }}
                  >
                    Cancel
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <label>New E-mail : </label>
                    <Input
                      type='email'
                      placeholder={user.email}
                      value={newUser.email}
                      onChange={onChangeEmail}
                      name='email'
                      style={{ height: '2rem', width: '300px' }}
                      required
                    />
                    <br />
                  </div>
                  <Button>Save</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Email</strong>
                  <br />
                  <br />
                  {newUser.email}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ email: true });
                  }}
                >
                  Modify
                </Modify>
              </>
            )}
          </Flexbox>
        </Article>
      </Wrapper>
    </Section>
  );
};

export default Personal;
