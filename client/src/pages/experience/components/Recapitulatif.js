import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
  width: 100%;
`;

const CardType = styled.div`
  width: 50%;
  margin-top: 2rem;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.4);
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
  margin-right: 1rem;
  padding: 1rem;
`;
const Top = styled.div`
  width: 90%;
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

const ContenuCategory = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  h3 {
    margin: 0;
  }
`;

const Button = styled.button`
  width: 20%;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  height: 3rem;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 50px;
  transition: all 0.3s ease-in-out;
  background-image: linear-gradient(
    to right,
    #eb3941,
    #f15e64,
    #e14e53,
    #e2373f
  );
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(242, 97, 103, 0.4);
  line-height: 0;
  :hover {
    background-position: 100% 0;
    transition: all 0.3s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 1rem;
  margin-top: 2rem;
  border: 3px rgba(255, 255, 255, 0.3) solid;
`;

const Recapitulatif = ({
  experience,
  setLiSelected,
  validation,
  success,
  error,
}) => {
  return (
    <Wrapper>
      <Top>
        <h2>Récapitulatif de votre expérience</h2>
        <p>
          Relisez les données que vous nous avez partagé, vous pouvez encore
          modifier en naviguant dans les parties correspondante.
        </p>
        <p>
          A savoir que dès vous nous envoyé votre expérience, notre équipe
          examinera votre expérience et la validera ou refusera en vous
          expliquant les points qu'il faudra améliorer.
        </p>
        <ContenuCategory>
          <CardType onClick={() => setLiSelected(0)}>
            <h3>Type d'activité</h3>
            <strong>{experience.type}</strong>
          </CardType>
          <CardType onClick={() => setLiSelected(1)}>
            <h3>Titre de votre expérience : </h3>
            <strong>{experience.title}</strong>
          </CardType>
          <CardType onClick={() => setLiSelected(2)}>
            <h3>Votre thème : </h3>
            <strong>{experience.theme.category} - </strong>
            <strong>{experience.theme.precision}</strong>
          </CardType>
          <CardType onClick={() => setLiSelected(3)}>
            <h3>Ville</h3>
            <strong>{experience.lieu}</strong>
          </CardType>
          <CardType onClick={() => setLiSelected(4)}>
            <h3>Adresse exacte : </h3>
            <strong>{experience.exactAddress}</strong>
          </CardType>
          <CardType style={{ width: '100%' }} onClick={() => setLiSelected(5)}>
            <h3>Au programme : </h3>
            <strong>{experience.programme}</strong>
          </CardType>
          <CardType style={{ width: '100%' }} onClick={() => setLiSelected(6)}>
            <h3>A propos de vous : </h3>
            <strong>{experience.aboutYou}</strong>
          </CardType>
          <CardType style={{ width: '100%' }} onClick={() => setLiSelected(7)}>
            <h3>Photos : </h3>
            <strong>{experience.photos}</strong>
          </CardType>
          {error ? <h2 style={{ color: 'red' }}>{error}</h2> : null}
          {success ? (
            <CardType>
              <h3>
                Votre expérience à bien été envoyée, veuillez patientez la
                vérification de nos équipes.
              </h3>
            </CardType>
          ) : (
            <Button onClick={validation}>Valider</Button>
          )}
        </ContenuCategory>
      </Top>
    </Wrapper>
  );
};

export default Recapitulatif;
