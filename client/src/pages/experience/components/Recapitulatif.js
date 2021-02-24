import React, { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.article`
  width: 100%;

  @media (min-width: 940px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CardType = styled.button`
  width: 100%;
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
  text-align: left;
  a {
    text-align: left;
  }
`;
const Top = styled.div`
  width: 100%;
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
  margin-top: 2rem;
  width: 223px;
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
          <CardType style={{ width: "100%" }} onClick={() => setLiSelected(5)}>
            <h3>Au programme : </h3>
            <strong>{experience.programme}</strong>
          </CardType>
          <CardType style={{ width: "100%" }} onClick={() => setLiSelected(6)}>
            <h3>A propos de vous : </h3>
            <strong>{experience.aboutYou}</strong>
          </CardType>
          <CardType style={{ width: "100%" }} onClick={() => setLiSelected(7)}>
            <h3>Photos : </h3>
            <strong>{experience.photos}</strong>
          </CardType>
          {error ? <h2 style={{ color: "red" }}>{error}</h2> : null}
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
