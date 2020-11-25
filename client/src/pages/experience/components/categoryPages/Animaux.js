import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Animaux = ({ experience, setExperience, isSelected, setIsSelected }) => {
  const onSelect = (e) => {
    setExperience({
      ...experience,
      theme: {
        category: experience.theme.category,
        precision: e.target.name,
      },
    });
    setIsSelected({
      ...isSelected,
      animaux: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Apiculture' onClick={onSelect}>
        Apiculture
      </CardTypeCategory>
      <CardTypeCategory name='Balade à cheval' onClick={onSelect}>
        Balade à cheval
      </CardTypeCategory>
      <CardTypeCategory name='equitation' onClick={onSelect}>
        Cours d'équitation
      </CardTypeCategory>
      <CardTypeCategory name='Observation des baleines' onClick={onSelect}>
        Observation des baleines
      </CardTypeCategory>
      <CardTypeCategory name='Observations des oiseaux' onClick={onSelect}>
        Observations des oiseaux
      </CardTypeCategory>
      <CardTypeCategory name='Animal de ferme' onClick={onSelect}>
        Animal de ferme
      </CardTypeCategory>
      <CardTypeCategory name='Animal de refuge' onClick={onSelect}>
        Animal de refuge
      </CardTypeCategory>
      <CardTypeCategory name='Animal domestique' onClick={onSelect}>
        Animal domestique
      </CardTypeCategory>
      <CardTypeCategory name='Vie marine' onClick={onSelect}>
        Vie marine
      </CardTypeCategory>
      <CardTypeCategory name='Vie sauvage' onClick={onSelect}>
        Vie sauvage
      </CardTypeCategory>
      <CardTypeCategory name='Autre expérience animalière' onClick={onSelect}>
        Autre expérience animalière
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Animaux;
