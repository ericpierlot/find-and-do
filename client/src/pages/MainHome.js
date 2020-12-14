import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchExperience from '../utils/SearchExperience';
import axios from 'axios';

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

const Contenu = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border-radius: 15px;
  width: 100%;
  margin: auto;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border: 3px solid transparent;
  background-clip: padding-box;
  @media (max-width: 920px) {
    width: 80%;
  }
`;

const ListVilles = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border: 3px solid transparent;
  background-clip: padding-box;
  span:first-child {
    &:before {
      content: ' ';
    }
  }
  span:nth-child(1n) {
    &:after {
      content: ' - ';
    }
  }
  span:last-child {
    &:after {
      content: '.';
    }
  }

  @media (min-width: 840px) {
    bottom: 0px;
    flex-direction: row;
    height: 60px;
  }
`;
const fetchCityExperiences = () => {
  return axios
    .get('/api/experiences/allcity')
    .then(({ data }) => {
      return data;
    })
    .catch((err) => console.error(err));
};

const MainHome = () => {
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    fetchCityExperiences()
      .then((data) => setCityData(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Section>
      <Container>
        <Left>
          <Title>Find & Do</Title>
          <UnderTitle>De nouvelles expériences</UnderTitle>
        </Left>
        <Right>
          <Contenu>
            <SearchExperience
              type='search'
              name='ville'
              placeholder="Entrez le nom d'une Ville..."
            />
          </Contenu>
        </Right>
        <ListVilles>
          <div>
            Actuellement il y a des expériences dans les villes suivantes :
          </div>
          <div>
            {cityData.map((ville, idx) => {
              const { lieu } = ville;
              return <span key={idx}>{lieu}</span>;
            })}
          </div>
        </ListVilles>
      </Container>
    </Section>
  );
};

export default MainHome;
