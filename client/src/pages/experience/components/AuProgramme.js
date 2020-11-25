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
    margin-bottom: 2rem;
  }
`;

const Contenu = styled.div`
  width: 40%;
  margin: auto;

  h3 {
    margin-top: 2rem;
  }

  ul {
    margin-top: 1rem;
    list-style-type: decimal;
  }

  li {
    margin-top: 1rem;
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

  ::placeholder {
    color: black;
    opacity: 1;
  }
`;

const AuProgramme = ({ experience, setExperience }) => {
  return (
    <Wrapper>
      <Top>
        <h2>Au Programme</h2>
        <p>
          Votre description de l'activité doit inspirer les voyageurs et leur
          donner envie de participer à votre expérience. Imaginez qu'elle
          raconte une histoire, avec un début, un milieu et une fin.
        </p>
      </Top>
      <Contenu>
        <h3>Décrivez votre expérience</h3>
        <ul>
          <li>
            Tout d'abord, décrivez brièvement les activités que vous ferez avec
            les voyageurs. En quoi votre expérience se démarque-t-elle des
            autres du même genre ?
          </li>
          <li>
            Donnez ensuite plus de détails. Comment allez-vous briser la glace ?
            Comment allez-vous faire pour que les voyageurs se sentent impliqués
            et participent durant l'expérience ?
          </li>
          <li>
            Enfin, indiquez ce que vous voulez que les voyageurs tirent de leur
            séjour. Des amis ? Des connaissances ? Une meilleure compréhension
            de votre culture ? Terminez par un argument de vente solide.
          </li>
        </ul>
        <TextArea
          name='programme'
          id=''
          cols='30'
          rows='10'
          placeholder="Quel type d'expérience proposez-vous ? Donnez des détails !"
          value={experience.programme}
          onChange={(e) =>
            setExperience({
              ...experience,
              programme: e.target.value,
            })
          }
        ></TextArea>
      </Contenu>
    </Wrapper>
  );
};

export default AuProgramme;
