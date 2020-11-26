import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../utils/components/Spinner';
import {
  Wrapper,
  Section,
  Article,
} from '../../../css/styled/Experience/styled';
import styled from 'styled-components';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  backdrop-filter: blur(5px);
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  width: 100%;
  border-radius: 10px;
  padding: 1rem;
  margin-top: 2.5rem;

  p {
    margin-top: 1rem;
    width: 100%;
  }
  @media (max-width: 1200px) {
    width: 225px;
  }

  @media (max-width: 920px) {
    width: 200px;
    height: 150px;
    justify-content: space-evenly;
  }
`;

const TOP = styled.div`
  width: 100%;
  margin: auto;
  h2 {
    margin-top: 2.2rem;
  }
  h4 {
    margin-top: 1rem;
  }
`;

const IMAGES = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: auto;
  img {
    border: 2px solid whitesmoke;
    border-radius: 15px;
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
  margin: auto;
  margin-bottom: 1rem;
  border: 3px rgba(255, 255, 255, 0.3) solid;
`;

const ExperienceById = () => {
  const [readThisID, setReadThisID] = useState('');
  const {
    title,
    aboutYou,
    category,
    precision,
    createdBy,
    exactAddress,
    createdAt,
    lieu,
    programme,
    type,
  } = readThisID;
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // go to my api rest /api/experience/:id
    const fetchExperienceID = async () => {
      const { data } = await axios.get(`/api/experiences/id/${id}`);
      setReadThisID(data);
    };
    fetchExperienceID();
  }, []);

  return (
    <Section>
      <Wrapper>
        <Article>
          {readThisID ? (
            <>
              <IMAGES>
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image1'
                />
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image2'
                />
                <img
                  src='https://source.unsplash.com/random/226x170'
                  alt='image3'
                />
                <img
                  src='https://source.unsplash.com/random/226x170'
                  alt='image4'
                />
                <img
                  src='https://source.unsplash.com/random/226x340'
                  alt='image5'
                />
              </IMAGES>
              <TOP>
                <h2>{title}</h2>
                <h4>
                  Proposée sur <u>{lieu}</u>
                </h4>
              </TOP>
              <DivWrapper style={{ height: '100px' }}>
                <h2>Expérience organisée par 'nom de l'auteur'</h2>
              </DivWrapper>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <DivWrapper style={{ width: '48%' }}>
                  <h2>Au programme</h2>
                  <p>{programme}</p>
                </DivWrapper>
                <DivWrapper style={{ width: '48%' }}>
                  <h2>A propos de 'nom de l'auteur'</h2>
                  <p>{aboutYou}</p>
                </DivWrapper>
              </div>
              <DivWrapper style={{ textAlign: 'center' }}>
                <Button>Contacter 'Nom de l'auteur'</Button>
                <h6>
                  Pour protéger votre paiement, ne transférez jamais d'argent et
                  ne communiquez pas en dehors du site ou de l'application Find
                  & Do
                </h6>
              </DivWrapper>
            </>
          ) : (
            <Spinner />
          )}
        </Article>
      </Wrapper>
    </Section>
  );
};

export default ExperienceById;
