import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.article`
  width: 100%;
  margin-top: 10vh;
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

  ul {
    margin-top: 1rem;
    list-style-type: decimal;
  }

  li {
    margin-top: 1rem;
  }
`;

const PhotosExperience = ({ experience, setExperience }) => {
  return (
    <Wrapper>
      <Top>
        <h1>En cours de développement...</h1>
        <h2>Ajoutez des photos à votre expérience</h2>
        <p>
          Ajoutez au moins 3 photos de bonne qualité pour donner aux voyageurs
          un aperçu de votre expérience. Elles seront passées en revue par notre
          équipe pour s'assurer qu'elles sont conformes à nos critères.
        </p>
        <h3>Critères requis pour toutes les photos</h3>
        <ul>
          <li>Les photos doivent être claires, nettes et en couleur</li>
          <li>Elles doivent illustrer avec précision l'expérience</li>
          <li>
            Elles ne peuvent pas montrer des personnes qui posent ou qui
            prennent un selfie
          </li>
          <li>
            Elles ne peuvent pas être modifiées avec des filtres, du texte ni
            des illustrations, des logos ou des collages
          </li>
          <li>
            Elles doivent vous appartenir : n'utilisez pas d'œuvres protégées
            par le droit d'auteur
          </li>
        </ul>
      </Top>
    </Wrapper>
  );
};

export default PhotosExperience;
