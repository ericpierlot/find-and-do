import React from 'react';
import styled from 'styled-components';
import { Card } from './components/Card';
import { Link } from 'react-router-dom';

const Section = styled.section`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and(min-width: 840px) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 840px) {
    text-align: left;
    width: 40%;
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
  color: #b62c2c;
  font-size: 1rem;
  letter-spacing: 0.125rem;
  font-weight: 600;
  text-shadow: rgba(60, 64, 67, 0.3) 0px 1px 10px;
  @media (min-width: 840px) {
    margin-bottom: 0;
    font-size: 2rem;
  }
`;

const Contenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin: auto;
  background-clip: padding-box;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  @media screen and(min-width: 840px) {
    width: 100%;
    flex-direction: row;
  }
`;

const Admin = () => {
  return (
    <Section>
      <Container>
        <Left>
          <Title>Panel</Title>
          <UnderTitle>Administrateur</UnderTitle>
        </Left>
        <Right>
          <Contenu>
            <Link to='/admin/experiences'>
              <Card
                Image=''
                Title='Expériences'
                Description='Accédez à la liste de toutes les expériences, pouvoir de les Activer / Désactiver.'
              />
            </Link>
            <Link to='/admin/utilisateurs'>
              <Card
                Image=''
                Title='Utilisateurs'
                Description='Accédez à la liste des utilisateurs, voir le profil de chacun, pouvoir bannir un utilisateur.'
              />
            </Link>
          </Contenu>
        </Right>
      </Container>
    </Section>
  );
};

export default Admin;
