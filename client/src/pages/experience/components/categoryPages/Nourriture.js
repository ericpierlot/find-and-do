import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Nourriture = ({
  experience,
  setExperience,
  isSelected,
  setIsSelected,
}) => {
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
      nourriture: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Faire de la cuisine' onClick={onSelect}>
        Faire de la cuisine
      </CardTypeCategory>
      <CardTypeCategory name='Dégustation gastronomique' onClick={onSelect}>
        Dégustation gastronomique
      </CardTypeCategory>
      <CardTypeCategory
        name='Le tour de nourriture et de marchés'
        onClick={onSelect}
      >
        Le tour de nourriture et de marchés
      </CardTypeCategory>
      <CardTypeCategory name='Dîner sociale' onClick={onSelect}>
        Dîner sociale
      </CardTypeCategory>
      <CardTypeCategory name='Autre expérience culinaire' onClick={onSelect}>
        Autre expérience culinaire
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Nourriture;
