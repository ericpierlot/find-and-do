import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  width: 100%;
  height: 200px;
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

const AboutYou = ({ experience, setExperience, user }) => {
  return (
    <Wrapper>
      <Top>
        <h2>A propos de vous</h2>
        <h3>Votre nom complet</h3>
        <p>
          Les voyageurs veulent savoir qui va les accueillir. Vous devez entrer
          votre vrai nom, pas le nom d'une entreprise. Seul votre prénom
          apparaîtra sur votre page. Si vous avez des co-hôtes, vous pourrez
          ajouter leurs noms plus tard.
        </p>
        <p>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </p>
        <p>
          <Link to='/profil/personal-info'>Modifier le nom</Link>
        </p>
        <h3>Votre parcours</h3>
        <p>
          En quoi êtes-vous la personne idéale pour organiser cette expérience ?
          Expliquez aux voyageurs d'où vous viennent votre passion et vos
          connaissances sur ce sujet.
        </p>
        <TextArea
          value={experience.aboutYou}
          onChange={(e) =>
            setExperience({
              ...experience,
              aboutYou: e.target.value,
            })
          }
        ></TextArea>
        <h5>
          À retenir : l'accueil de voyageurs consiste en premier lieu à créer
          des liens, veillez donc à ce que cette section se focalise sur vous.
          Si vous prévoyez d'ajouter des coéquipiers, vous pourrez les
          identifier comme co-hôtes ou assistants dès que votre expérience sera
          publiée.
        </h5>
      </Top>
    </Wrapper>
  );
};

export default AboutYou;
