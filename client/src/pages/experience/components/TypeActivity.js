import React from 'react';
import styled from 'styled-components';

const CardType = styled.button`
  width: 45%;
  height: 150px;
  margin-top: 2rem;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  margin-right: 1rem;
`;

const Wrapper = styled.article`
  width: 100%;
  margin-top: 10vh;
`;

const Top = styled.div`
  width: 40%;
  margin: auto;
  h2 {
    margin-bottom: 2rem;
  }
`;

const Contenu = styled.div`
  width: 40%;
  margin: auto;
`;

const ActivityChoosen = ({ experience, setExperience }) => {
  return (
    <>
      <Wrapper>
        <Top>
          <h2>Quel type d'expérience allez-vous proposer ?</h2>
          <p>
            Les expériences en ligne peuvent être animées depuis n'importe où en
            vidéo, alors que les expériences en personne ont lieu sur place.
          </p>
        </Top>
        <Contenu>
          <CardType
            name='Expérience en personne'
            style={{
              border:
                experience.type === 'Expérience en personne'
                  ? 'black 5px solid'
                  : '',
            }}
            onClick={() => {
              setExperience({
                ...experience,
                type: 'Expérience en personne',
              });
            }}
          >
            EXPERIENCE EN PERSONNE
          </CardType>
          <CardType
            name='Expérience en ligne'
            style={{
              border:
                experience.type === 'Expérience en ligne'
                  ? 'black 5px solid'
                  : '',
            }}
            onClick={() => {
              setExperience({
                ...experience,
                type: 'Expérience en ligne',
              });
            }}
          >
            EXPERIENCE EN LIGNE
          </CardType>
        </Contenu>
      </Wrapper>
    </>
  );
};

export default ActivityChoosen;
