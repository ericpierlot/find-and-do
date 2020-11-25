import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
  width: 100%;
`;

const Top = styled.div`
  width: 40%;
  margin: auto;
  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  h3 {
    margin-top: 2rem;
  }
  p {
    margin-top: 1rem;
  }
`;

const Input = styled.input`
  font-size: 1.2rem;
  width: 100%;
  height: 2rem;
  outline: none;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  background-color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
  padding-left: 1rem;
  border: whitesmoke solid 2px;
  border-bottom: 2px black solid;
  margin-bottom: 2.5rem;
  transition: border-bottom 330ms ease-in-out;
  margin-top: 2rem;

  :focus {
    border-bottom: 2px #eb3941 solid;
  }
`;

const ExactAddress = ({ experience, setExperience }) => {
  return (
    <Wrapper>
      <Top>
        <h2>Adresse exacte</h2>
        <p>
          Ici veuillez définir l'adresse exacte de l'expérience, le voyageur
          sera en mesure de visualiser cette adresse sur une carte. Si votre
          expérience est une expérience en ligne, veuillez le préciser.
        </p>
        <Input
          value={experience.exactAddress}
          onChange={(e) =>
            setExperience({
              ...experience,
              exactAddress: e.target.value,
            })
          }
        />
      </Top>
    </Wrapper>
  );
};

export default ExactAddress;
