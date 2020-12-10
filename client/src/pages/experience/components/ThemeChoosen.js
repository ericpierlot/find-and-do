import React, { useState } from 'react';
import styled from 'styled-components';
// Art, Bienetre, Boisson, Divertissement, Nourriture, Histoire, Nature, Visite, Sports, Bienetre
import {
  Animaux,
  Art,
  Bienetre,
  Boisson,
  Culture,
  Divertissement,
  Histoire,
  Nature,
  Nourriture,
  Sports,
  Visite,
} from './categoryPages';

const CardType = styled.button`
  width: 100%;
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

const ContenuCategory = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const CardTypeCategory = styled.button`
  width: 20%;
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

const ThemeChoosen = ({ experience, setExperience, setLiExperience }) => {
  /* 
  TOUT LES CATEGORIES SONT DANS LE DOSSIER /PAGES/EXPRIENCE/COMPONENTS/CATEGORYPAGE
  */

  const [isSelected, setIsSelected] = useState({
    principale: false,
    animaux: false,
    art: false,
    culture: false,
    boisson: false,
    divertissement: false,
    nourriture: false,
    histoire: false,
    nature: false,
    visite: false,
    sports: false,
    bienetre: false,
  });

  const onSelect = (e) => {
    // Pour éviter de tout écrire 1 par 1 .. je supprime les valeurs du isSelected et met uniquement true à une.
    // Pour ensuite ouvrir une page par rapport à la catégorie

    setIsSelected({
      principale: false,
      [e.target.value]: true,
    });

    setExperience({
      ...experience,
      theme: {
        category: e.target.name,
        precision: '',
      },
    });
  };

  const indexTheme = (
    <Wrapper>
      <Top>
        <h2>Quel type d'expérience allez-vous proposer ?</h2>
        <p>
          Choisissez le thème qui décrit le mieux l'activité principale de votre
          expérience. Cela permettra aux voyageurs de trouver et réserver votre
          expérience.
        </p>
      </Top>
      <Contenu>
        <CardType
          onClick={(e) =>
            setIsSelected({
              ...isSelected,
              principale: true,
            })
          }
        >
          <h2>
            {experience.theme.category
              ? experience.theme.category
              : 'Veuillez choisir un thème'}
          </h2>
          <p>{experience.theme.precision ? experience.theme.precision : ''}</p>
        </CardType>
      </Contenu>
    </Wrapper>
  );
  const pagePrincipale = (
    <ContenuCategory>
      <CardTypeCategory name='Animaux' value='animaux' onClick={onSelect}>
        Animaux
      </CardTypeCategory>

      <CardTypeCategory name='Art et design' value='art' onClick={onSelect}>
        Art et design
      </CardTypeCategory>
      <CardTypeCategory
        name='Culture, société et science'
        value='culture'
        onClick={onSelect}
      >
        Culture, société et science
      </CardTypeCategory>
      <CardTypeCategory name='Boisson' value='boisson' onClick={onSelect}>
        Boisson
      </CardTypeCategory>
      <CardTypeCategory
        name='Divertissement'
        value='divertissement'
        onClick={onSelect}
      >
        Divertissement
      </CardTypeCategory>
      <CardTypeCategory name='Nourriture' value='nourriture' onClick={onSelect}>
        Nourriture
      </CardTypeCategory>
      <CardTypeCategory
        name='Histoire et littérature'
        value='histoire'
        onClick={onSelect}
      >
        Histoire et littérature
      </CardTypeCategory>
      <CardTypeCategory
        name='Nature en plein air'
        value='nature'
        onClick={onSelect}
      >
        Nature en plein air
      </CardTypeCategory>
      <CardTypeCategory
        name='Visite, shopping et transport'
        value='visite'
        onClick={onSelect}
      >
        Visite, shopping et transport
      </CardTypeCategory>
      <CardTypeCategory name='Sports' value='sports' onClick={onSelect}>
        Sports
      </CardTypeCategory>
      <CardTypeCategory name='Bien-être' value='bienetre' onClick={onSelect}>
        Bien-être
      </CardTypeCategory>
    </ContenuCategory>
  );

  return (
    <>
      {experience.theme.category === '' && !isSelected.principale
        ? indexTheme
        : null}
      {experience.theme.precision !== '' && !isSelected.principale
        ? indexTheme
        : null}
      <Wrapper>
        {isSelected.principale ? pagePrincipale : null}
        {isSelected.animaux && (
          <Animaux
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.art && (
          <Art
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.bienetre && (
          <Bienetre
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.boisson && (
          <Boisson
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.culture && (
          <Culture
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.divertissement && (
          <Divertissement
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.histoire && (
          <Histoire
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.nature && (
          <Nature
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.nourriture && (
          <Nourriture
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.sports && (
          <Sports
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
        {isSelected.visite && (
          <Visite
            experience={experience}
            setExperience={setExperience}
            isSelected={isSelected}
            setIsSelected={setIsSelected}
          />
        )}
      </Wrapper>
    </>
  );
};

export default ThemeChoosen;
