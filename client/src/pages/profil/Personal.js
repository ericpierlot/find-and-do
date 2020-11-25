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
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  @media (max-width: 920px) {
    min-width: 100%;
    height: 100vh;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    padding: 1rem;
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
  background-color: transparent;
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 1rem;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);

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
      return setAlert('Votre prénom ne peut pas être vide', 'danger');

    if (newUser.lastName === '')
      return setAlert('Votre nom de famille ne peut pas être vide', 'danger');

    setNewSelected({ legalName: true });
  };

  const BirthdateSubmit = (e) => {
    e.preventDefault();
    if (newUser.birthdate.months === 'Month' || newUser.birthdate.months === '')
      return setAlert('Vous devez choisir un mois', 'danger');
    if (newUser.birthdate.days > 31)
      return setAlert('Le jour ne peut pas être plus grand que 31', 'danger');
    if (newUser.birthdate.days < 1)
      return setAlert('Le jour ne peut pas être plus petit que 1', 'danger');
    if (newUser.birthdate.years > 2021)
      return setAlert('Vous ne pouvez pas être né dans le futur', 'danger');
    if (newUser.birthdate.years < 1900)
      return setAlert(
        'Mmmmh vous devez vous inscrire dans le livre des records.. du plus viel Humain',
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
    if (!emailIsValid(email))
      return setAlert('Cette adresse e-mail est invalide', 'danger');

    // Everything looks fine, then let's send :
    setNewSelected({ email: true });
  };

  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Mon compte</Link> → Infos personnelles
          </h4>
          <br />
          <h2>Infos personnelles</h2>
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
                  <strong>Nom complet</strong>

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
                    Annuler
                  </div>
                </div>
                <br />
                <br />
                <div style={{ width: '100%' }}>
                  C'est le nom qui figure sur votre carte d'identité, votre
                  passeport, votre permis de conduire.
                </div>
                <br />
                <br />
                <div>
                  <div>
                    <label>Prénom : </label>
                    <Input
                      placeholder={user.firstName}
                      value={newUser.firstName}
                      onChange={onChange}
                      name='firstName'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>Nom de famille : </label>
                    <Input
                      placeholder={user.lastName}
                      value={newUser.lastName}
                      onChange={onChange}
                      style={{ height: '2rem' }}
                      name='lastName'
                    />
                  </div>
                  <Button>Enregistrer</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Nom complet</strong>
                  <br />
                  <br />
                  {newUser.firstName}{' '}
                  {newUser.lastName ? (
                    newUser.lastName
                  ) : (
                    <strong> Veuillez définir votre Nom de famille</strong>
                  )}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ legalName: true });
                  }}
                >
                  Modifier
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
                  <strong>Date de naissance</strong>

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
                    Annuler
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <InputDays
                      id='days'
                      name='days'
                      value={newUser.birthdate.days}
                      placeholder='JJ'
                      onChange={onChangeBirthdate}
                    />
                    <SelectMonths
                      id='months'
                      name='months'
                      value={newUser.birthdate.months}
                      onChange={onChangeBirthdate}
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
                      value={newUser.birthdate.years}
                      placeholder='AAAA'
                      onChange={onChangeBirthdate}
                    />
                  </div>
                  <Button style={{ width: '30%' }}>Enregistrer</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Date de naissance</strong>
                  <br />
                  <br />
                  Né(e) le {newUser.birthdate.days} {newUser.birthdate.months}{' '}
                  {newUser.birthdate.years}.
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ birthate: true });
                  }}
                >
                  Modifier
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
                  <strong>Adresse e-mail</strong>

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
                    Annuler
                  </div>
                </div>
                <br />
                <br />
                <div style={{}}>
                  <div>
                    <label>Nouvelle adresse : </label>
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
                  <Button>Sauvegarder</Button>
                  <Alerts />
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Adresse e-mail</strong>
                  <br />
                  <br />
                  {newUser.email}
                </p>
                <Modify
                  onClick={() => {
                    setIsClicked({ email: true });
                  }}
                >
                  Modifier
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
