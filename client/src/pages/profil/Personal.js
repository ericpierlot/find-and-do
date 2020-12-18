import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginAndSecurity from './LoginAndSecurity';
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
  InputFirstName,
  InputEmail,
} from '../../css/styled/form';

const Section = styled.section`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 5rem;
  @media screen and(min-width: 840px) {
    width: 80%;
    padding-top: 0;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: none;
  }
  @media (min-width: 840px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
  text-align: center;
  margin: auto;
  padding-bottom: 2rem;
  @media (min-width: 840px) {
    padding-bottom: 0;
    text-align: left;
    width: 40%;
  }
`;
const Right = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    text-align: left;
    width: 60%;
  }
`;
const Title = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.textinvert};
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    font-size: 5rem;
  }
`;

const UnderTitle = styled.h3`
  color: ${({ theme }) => theme.textinvert};
  font-size: 1rem;
  letter-spacing: 0.125rem;
  font-weight: 600;
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    margin-bottom: 0;
    font-size: 2rem;
  }
`;
const Flexbox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 80px;
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 3px solid transparent;
  background-clip: padding-box;

  @media (max-width: 920px) {
    width: 100%;
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

        try {
          await axios.put(`/api/users/${user._id}/email`, newUser, config);
          // Refresh the user in my Context
          loadUser();
        } catch (error) {
          return (
            setAlert('Cette addresse e-mail est déjà utilisée', 'red'),
            setNewUser({
              ...newUser,
              email: user.email,
            })
          );
        }
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
      return setAlert('Votre prénom ne peut pas être vide', 'red');

    if (newUser.lastName === '')
      return setAlert('Votre nom de famille ne peut pas être vide', 'red');

    setNewSelected({ legalName: true });
  };

  const BirthdateSubmit = (e) => {
    e.preventDefault();
    if (newUser.birthdate.months === 'Month' || newUser.birthdate.months === '')
      return setAlert('Vous devez choisir un mois', 'red');
    if (newUser.birthdate.days > 31)
      return setAlert('Le jour ne peut pas être plus grand que 31', 'red');
    if (newUser.birthdate.days < 1)
      return setAlert('Le jour ne peut pas être plus petit que 1', 'red');
    if (newUser.birthdate.years > 2021)
      return setAlert('Vous ne pouvez pas être né dans le futur', 'red');
    if (newUser.birthdate.years < 1900)
      return setAlert(
        'Mmmmh vous devez vous inscrire dans le livre des records.. du plus viel Humain',
        'red'
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
      return setAlert('Cette adresse e-mail est invalide', 'red');

    // Everything looks fine, then let's send :
    setNewSelected({ email: true });
  };

  return (
    <Section>
      <Container>
        <Left>
          <UnderTitle>
            <Link to='/profil'>Mon compte</Link>
          </UnderTitle>
          <Title>Infos personnelles</Title>
        </Left>
        <Right>
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
                    <InputFirstName
                      placeholder={user.firstName}
                      value={newUser.firstName}
                      onChange={onChange}
                      name='firstName'
                      style={{ height: '2rem' }}
                    />
                    <br />
                    <label>Nom de famille : </label>
                    <InputFirstName
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
                  {user.firstName}{' '}
                  {user.lastName ? (
                    user.lastName
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
                  <div>
                    <Button style={{ width: '30%' }}>Enregistrer</Button>
                    <Alerts />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Date de naissance</strong>
                  <br />
                  <br />
                  Né(e) le {user.birthdate.days} {user.birthdate.months}{' '}
                  {user.birthdate.years}.
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
                <div>
                  <div>
                    <label>Nouvelle adresse : </label>
                    <InputEmail
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
                </div>
              </>
            ) : (
              <>
                <p>
                  <strong>Adresse e-mail</strong>
                  <br />
                  <br />
                  {user.email}
                </p>
                <Alerts />
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
          <LoginAndSecurity />
        </Right>
      </Container>
    </Section>
  );
};

export default Personal;
