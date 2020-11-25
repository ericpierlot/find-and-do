import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';

// My Components
import NavCreateExperience from './components/NavCreateExperience';
import Address from './components/Address';
import TypeActivity from './components/TypeActivity';
import ThemeChoosen from './components/ThemeChoosen';
import AboutYou from './components/AboutYou';
import AuProgramme from './components/AuProgramme';
import ExactAddress from './components/ExactAddress';
import TitleExperience from './components/TitleExperience';
import PhotosExperience from './components/PhotosExperience';
import Recapitulatif from './components/Recapitulatif';

const Section = styled.section`
  margin: auto;
  width: 100vw;
  margin-top: 90px;
  margin-bottom: 45px;
  transition: all 0.4s ease-in-out;
  @media (max-width: 920px) {
    width: 100vw;
    margin: 0;
  }
`;

const Flex = styled.div`
  display: flex;
  width: 50%;
  height: 70vh;
  margin: auto;
  transition: all 0.4s ease-in-out;
  @media (max-width: 920px) {
    height: 100vh;
    width: 100vw;
    border-radius: 0;
  }
`;

const Enter = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
  border-radius: 50px;
  padding: 1rem;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  padding: 2rem;
  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1.2rem;
    padding-top: 2rem;
  }
  margin: auto;
  transition: all 0.4s ease-in-out;

  @media (max-width: 920px) {
    height: 100vh;
    width: 100vh;
    border-radius: 0;
  }
`;

const EnterButton = styled.button`
  width: 30%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  height: 3rem;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  :hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }

  border: 3px rgba(255, 255, 255, 0.3) solid;
  margin-top: 2rem;
  @media (max-width: 920px) {
    width: 50%;
  }
`;

const ConteneurCreateExperience = styled.div`
  width: 100vw;
  margin-top: 90px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
`;

const ContenuCreateExperience = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.2);
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
`;

const ExperienceCreate = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  // Modifier à 0 pour un fonctionnement normal
  const [numberOfPage, setNumberOfPage] = useState(1);

  const [liSelected, setLiSelected] = useState(0);
  const [experience, setExperience] = useState({
    type: '',
    lieu: '',
    theme: {
      category: '',
      precision: '',
    },
    programme: '',
    aboutYou: '',
    exactAddress: '',
    title: '',
    photos: 'a',
  });

  const [citySuggested, setCitySuggested] = useState([]);

  useEffect(() => {
    if (experience.lieu.length > 0) {
      const config = {
        headers: '',
      };
      const FetchCityAPI = async () => {
        const { data } = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode?q=${experience.lieu}&apiKey=vVtg-sSJWaB1KQ5481hHJq5PmJV27oiCwpdS6p70A38`,
          config
        );
        if (data) {
          // console.log('data : ', data);
          // Filter to have only French city
          const dataFiltered = await data.items.filter(
            (item) => item.address.countryName === 'France'
          );
          //console.log('Data filtré : ', dataFiltered);
          await setCitySuggested(dataFiltered);
        }
      };
      FetchCityAPI();
    }
  }, [experience.lieu]);

  // Render city name & postal code
  const render = citySuggested.map((item, index) => {
    return (
      <option
        key={index}
        value={`${item.address.city} - ${item.address.postalCode}`}
      />
    );
  });

  return (
    <>
      {numberOfPage === 0 && (
        <Section>
          <Flex>
            <Enter>
              <h1> Bienvenue ! Votre vie de partage commence ici.</h1>
              <p>
                Les expériences de Find & Do sont des activités en petit groupe
                animées par des passionnés locaux.
              </p>
              <p>
                Les idées d'expériences sont évaluées par une équipe de Find &
                Do. Si votre idée répond à nos critères de qualité, vous pourrez
                ajouter des dates et commencer à proposer votre expérience.
              </p>
              <p>
                Nous avons hâte de mieux vous connaître et d'en savoir plus sur
                ce que vous souhaitez faire découvrir au monde.
              </p>
              <EnterButton
                onClick={() =>
                  setNumberOfPage((numberOfPage) => numberOfPage + 1)
                }
              >
                Entrer
              </EnterButton>
            </Enter>
          </Flex>
        </Section>
      )}
      {numberOfPage === 1 && (
        <ConteneurCreateExperience>
          <NavCreateExperience
            experience={experience}
            setLiSelected={setLiSelected}
          />
          <ContenuCreateExperience>
            {liSelected === 0 && (
              <TypeActivity
                experience={experience}
                setExperience={setExperience}
                setLiSelected={setLiSelected}
              />
            )}
            {/* PAGE LIEU*/}
            {liSelected === 1 && experience.type && (
              <Address
                experience={experience}
                render={render}
                setExperience={setExperience}
              />
            )}
            {/* PAGE THEME */}
            {liSelected === 2 && (
              <ThemeChoosen
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 3 && (
              <AuProgramme
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 4 && (
              <AboutYou
                user={user}
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 5 && (
              <ExactAddress
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 6 && (
              <TitleExperience
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 7 && (
              <PhotosExperience
                experience={experience}
                setExperience={setExperience}
              />
            )}
            {liSelected === 8 && (
              <Recapitulatif
                experience={experience}
                setExperience={setExperience}
              />
            )}
          </ContenuCreateExperience>
        </ConteneurCreateExperience>
      )}
    </>
  );
};

export default ExperienceCreate;
