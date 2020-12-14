import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../profil/components/Card';

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

const Messagerie = () => {
  return (
    <Section>
      <Container>
        <Left>
          <UnderTitle>
            <Link to='/profil'>Mon compte</Link>
          </UnderTitle>
          <Title>Messagerie</Title>
        </Left>
        <Right>
          <Link to='/profil/messagerie/reception'>
            <Card
              Image='📩'
              ImageAlt='Messagerie'
              Title='Boite de réception'
              Description='Lisez et répondez aux messages reçu'
            />
          </Link>
          <Link to='/profil/messagerie/envoi'>
            <Card
              Image='📧'
              ImageAlt='Messagerie'
              Title="Boite d'envoi"
              Description='Lisez vos messages envoyé'
            />
          </Link>
        </Right>
      </Container>
    </Section>
  );
};

export default Messagerie;
