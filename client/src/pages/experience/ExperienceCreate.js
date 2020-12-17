import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: auto;
  background-clip: padding-box;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  @media (max-width: 920px) {
    width: 80%;
  }
`;
const ContainState = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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
  a {
    color: ${({ theme }) => theme.text};
  }
  p {
    padding-top: 1rem;
    font-size: 1.2rem;
  }
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
`;

const EnterButton = styled.button`
  margin: auto;
  margin-top: 1rem;
  width: 50%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  height: 3rem;
  text-align: center;
  border: none;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #eb9e82;

  font-weight: 600;
  :hover {
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 1rem;
  border: 3px transparent solid;
  background-clip: padding-box;
`;

const ConteneurCreateExperience = styled.div`
  width: 100vw;
  margin-top: 90px;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  @media (max-width: 920px) {
    flex-direction: column;
    width: 100vw;
    border: 0;
    padding: 1rem;
  }
`;

const ContenuCreateExperience = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.2);
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  @media (max-width: 920px) {
    width: 100%;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
`;

const ExperienceCreate = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const history = useHistory();
  const [numberOfPage, setNumberOfPage] = useState(
    user.experienceCreated[0] ? false : 0
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [liSelected, setLiSelected] = useState(0);
  const [experience, setExperience] = useState({
    type: '',
    lieu: '',
    theme: {
      category: '',
      precision: '',
    },
    programme: ``,
    aboutYou: ``,
    exactAddress: '',
    title: '',
    photos: 'En développement',
  });

  const [citySuggested, setCitySuggested] = useState([]);
  useEffect(() => {
    if (!user && !numberOfPage) return history.push('/');
  }, [numberOfPage, user, history]);
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
  // Mon envoi à ma BDD
  const validation = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const register = async () => {
      try {
        await axios.post('/api/experiences', experience, config);
        setSuccess(true);
      } catch (error) {
        setError(error.response.data);
        setSuccess(false);
      }
    };

    register();
  };

  return (
    <>
      {numberOfPage === 0 && (
        <Section>
          <Container>
            <Left>
              <Title>Bienvenue !</Title>
              <UnderTitle>Votre vie de partage commence ici</UnderTitle>
            </Left>
            <Right>
              <Contenu>
                <ContainState>
                  <h2>
                    Les expériences de Find & Do sont des activités en petit
                    groupe animées par des passionnés locaux.
                  </h2>
                  <p>
                    Les idées d'expériences sont{' '}
                    <strong>évaluées par une équipe</strong> de Find & Do, si
                    votre idée répond à nos critères de qualité, vous pourrez
                    commencer à proposer votre expérience.
                  </p>
                  <p>
                    Nous avons hâte de mieux vous connaître et d'en savoir plus
                    sur ce que vous souhaitez{' '}
                    <strong>faire découvrir au monde.</strong>
                  </p>
                  <EnterButton
                    onClick={() =>
                      setNumberOfPage((numberOfPage) => numberOfPage + 1)
                    }
                  >
                    Commencer
                  </EnterButton>
                </ContainState>
              </Contenu>
            </Right>
          </Container>
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
                error={error}
                success={success}
                experience={experience}
                setExperience={setExperience}
                setLiSelected={setLiSelected}
                validation={validation}
              />
            )}
          </ContenuCreateExperience>
        </ConteneurCreateExperience>
      )}
    </>
  );
};

export default ExperienceCreate;
