import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchExperience from '../utils/SearchExperience';
import axios from 'axios';

const Section = styled.section`
  margin: auto;
  width: 100%;
  text-align: center;
  @media (max-width: 640px) {
    margin-top: 100px;
  }
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
  font-size: 5rem;
  @media (max-width: 768px) {
    font-size: 4rem;
    margin-bottom: 50px;
  }
`;

const UnderTitle = styled.h3`
  font-family: Montserrat;
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-size: 3rem;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.025em;
  line-height: 1;
  font-weight: 800;
  text-shadow: 0 1px 0 #e53e3e, 0 2px 0 #ce3737, 0 3px 0 #b73131,
    0 4px 0 #a02b2b, 0 5px 0 #721f1f, 0 6px 1px rgba(0, 0, 0, 0.1),
    0 0 5px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.3),
    0 3px 5px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.2), 0 20px 20px rgba(0, 0, 0, 0.15);
  @media (max-width: 820px) {
    font-size: 3rem;
  }
`;

const Contenu = styled.div`
  padding: 1rem;
  /* background-color: rgba(255, 255, 255, 0.4); */
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 30px;
  width: 30%;
  margin: auto;
  text-align: left;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  @media (max-width: 920px) {
    width: 80%;
  }
`;

const MainHome = () => {
  const [cityData, setCityData] = useState([]);

  const fetchCityExperiences = () => {
    return axios
      .get('/api/experiences/allcity')
      .then(({ data }) => {
        return data;
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchCityExperiences()
      .then((data) => setCityData(data || []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Section>
      <Title>Find & Do</Title>
      <UnderTitle>Awesome experiences</UnderTitle>
      <Contenu>
        <SearchExperience
          type='search'
          name='ville'
          placeholder="Entrez le nom d'une Ville..."
        />
        <div style={{ marginTop: '2rem', padding: '1rem' }}>
          Actuellement il y a des expériences dans les villes suivantes :
          <ul>
            {cityData.map((ville, idx) => {
              const { lieu } = ville;
              return <li key={idx}>{lieu}</li>;
            })}
          </ul>
        </div>
      </Contenu>
    </Section>
  );
};

export default MainHome;
