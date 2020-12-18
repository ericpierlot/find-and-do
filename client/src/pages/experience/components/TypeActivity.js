import React from 'react';
import styled from 'styled-components';

const CardType = styled.button`
  width: 223px;
  height: 150px;
  margin-top: 2rem;
  margin-right: 2rem;
  border-radius: 15px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid white;
  background-clip: padding-box;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
`;

const Wrapper = styled.article`
  width: 100%;

  @media (min-width: 940px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Top = styled.div`
  h2 {
    margin-bottom: 2rem;
  }
  width: 100%;
  @media (min-width: 940px) {
    width: 50%;
    margin: auto;
  }
`;

const Contenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  @media (min-width: 940px) {
    width: 50%;
    flex-direction: row;
    justify-content: space-between;
    margin: auto;
  }
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
