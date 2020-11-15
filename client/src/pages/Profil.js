import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Card from '../utils/components/Card';
import ProfilIcon from '../images/register.svg';
import styled from 'styled-components';
import AuthContext from '../context/auth/authContext';

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

  background-color: rgba(255, 255, 255, 0.2);

  @media (max-width: 920px) {
    min-width: 100%;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    :focus-within {
      box-shadow: none;
      transform: none;
    }
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

const Top = styled.header`
  width: 60%;
  margin: auto;
  padding-top: 1rem;
  padding-left: 1rem;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Profil = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  return (
    <Section>
      <Wrapper>
        <Top>
          <h2>Profil</h2>
          <p>
            {user.firstName}, {user.email}
          </p>
        </Top>
        <Article>
          <Link to='/profil/personal-info'>
            <Card
              Image={ProfilIcon}
              ImageAlt='Personal informations'
              Title='Personal informations'
              Description='Give more personal information and say how you will be contacted'
            />
          </Link>
          <Link to='/profil/login-and-security'>
            <Card
              Image={ProfilIcon}
              ImageAlt='Login and security'
              Title='Login and security'
              Description='Update your password and the security of your account'
            />
          </Link>
          <Link to='/profil/preferences'>
            <Card
              Image={ProfilIcon}
              ImageAlt='Global preferences'
              Title='Global preferences'
              Description='Define your language and your favorite Theme light or dark'
            />
          </Link>
        </Article>
      </Wrapper>
    </Section>
  );
};

export default Profil;
