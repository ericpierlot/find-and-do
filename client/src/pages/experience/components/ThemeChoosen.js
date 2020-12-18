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
    margin: auto;
  }
`;

const ContenuCategory = styled.div`
  width: 90%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media (min-width: 940px) {
    flex-direction: row;
    width: 90%;
    margin: auto;
  }
`;

const CardTypeCategory = styled.button`
  font-size: 1.2rem;
  width: 223px;
  height: 150px;
  margin-top: 2rem;
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  border-radius: 15px;
  padding: 1rem;
  border: 1px solid white;
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.header};
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
