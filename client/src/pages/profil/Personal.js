import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

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
    margin: 0;
  }
`;

const Flexbox = styled.form`
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px lightgrey solid;
  padding-bottom: 80px;
  margin-top: 10px;
`;
const Personal = () => {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;
  const [isClicked, setClicked] = useState(false);
  const [newLegalName, setNewLegalName] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  useEffect(() => {
    if (newLegalName) {
      const updateUser = async () => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };

        await axios.put(`/api/users/${user._id}`, newUser, config);
        // Refresh the user in my Context
        await loadUser();
        // Update my hooks User with new value
        setNewUser({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        });
      };
      // newLegalName value is true, (form sended) then I call my function updateUser
      updateUser();
      // Change display Modify to normal back
      setNewLegalName(!newLegalName);
      // Change "cancel" to "modify"
      setClicked(!isClicked);
    }
    // eslint-disable-next-line
  }, [newLegalName]);

  const onChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const LegalNameSubmit = (e) => {
    setNewLegalName(!newLegalName);
    e.preventDefault();
    // maybe checking if lastName not empty, but maybe it's too much struggle ? because force user to fill it.
  };
  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Profil</Link> > Personal Info
          </h4>
          <br />
          <h2>Personal Information</h2>
        </Top>
        <Article>
          <Flexbox onSubmit={LegalNameSubmit}>
            {isClicked ? (
              <>
                <p>
                  <strong>Legal Name</strong>
                  <br />
                  <br />
                  This is the name that you have on your passport or ID card or
                  License driving for example.
                  <br />
                  <input
                    placeholder={user.firstName}
                    value={newUser.firstName}
                    onChange={onChange}
                    name='firstName'
                  />
                  <input
                    placeholder={user.lastName}
                    value={newUser.lastName}
                    onChange={onChange}
                    name='lastName'
                  />
                  <button>Save</button>
                </p>
                <span
                  onClick={() => {
                    setClicked(!isClicked);
                  }}
                >
                  Cancel
                </span>
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
                <span
                  onClick={() => {
                    setClicked(!isClicked);
                  }}
                >
                  Modify
                </span>
              </>
            )}
          </Flexbox>
          <Flexbox>
            <p>
              <strong>Birthdate</strong>
              <br />
              <br />
              Born on {user.birthdate.days} {user.birthdate.months}{' '}
              {user.birthdate.years}.
            </p>
            <p>Modify</p>
          </Flexbox>
          <Flexbox>
            <p>
              <strong>Email address</strong>
              <br />
              <br />
              {user.email}
            </p>
            <p>Modify</p>
          </Flexbox>
        </Article>
      </Wrapper>
    </Section>
  );
};

export default Personal;
