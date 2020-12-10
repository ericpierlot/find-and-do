import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';

import Spinner from '../../utils/components/Spinner';

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

  background-color: transparent;

  @media (max-width: 920px) {
    min-width: 100%;
    height: 100vh;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    margin-bottom: 35px;
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
  padding-left: 1rem;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Button = styled.button`
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 15px;
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
`;

const ContainState = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: transparent;
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid whitesmoke;
`;

const ExperienceManage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [experience, setExperience] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const FetchUserExperience = async () => {
      try {
        const { data } = await axios.get(`/api/experiences/myexperience`, {
          params: { id },
        });
        setExperience(data);
        setIsLoading(false);
      } catch (error) {
        console.log('err', error);
        setIsLoading(false);
      }
    };

    FetchUserExperience();
  }, [id]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await axios.delete('/api/experiences/delete');
      setIsLoading(false);
      window.location = '/';
    } catch (error) {
      setIsLoading(false);

      const renderError = (
        <>
          <div>Erreur, vous ne possédez pas d'expérience.</div>
        </>
      );
      setIsError({ message: renderError });
    }
  };

  const { title, validated, _id } = experience ? experience[0] : '';

  return (
    <Section>
      {experience ? (
        <Wrapper>
          <Top>
            <h2>Gestionnaire de votre expérience</h2>
          </Top>
          <Article>
            <ContainState>
              <div>
                <Link to={`/experiences/id/${_id}`}>{title}</Link>
              </div>
              <div>
                {validated ? (
                  <span style={{ color: 'green' }}>En ligne</span>
                ) : (
                  <span style={{ color: 'red' }}>En cours de validation</span>
                )}
              </div>
              {isLoading ? (
                <Spinner />
              ) : (
                <Button onClick={handleDelete}>Supprimer</Button>
              )}
            </ContainState>
            {isError && isError.message}
          </Article>
        </Wrapper>
      ) : (
        <Spinner />
      )}
    </Section>
  );
};

export default ExperienceManage;
