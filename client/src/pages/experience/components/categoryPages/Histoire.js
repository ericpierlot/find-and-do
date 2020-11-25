import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Histoire = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      histoire: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory
        name="Discussion autour de l'histoire"
        onClick={onSelect}
      >
        Discussion autour de l'histoire
      </CardTypeCategory>
      <CardTypeCategory
        name="Visite de musée sur l'histoire"
        onClick={onSelect}
      >
        Visite de musée sur l'histoire
      </CardTypeCategory>
      <CardTypeCategory name='Visite historique' onClick={onSelect}>
        Visite historique
      </CardTypeCategory>
      <CardTypeCategory name='Lecture littéraire' onClick={onSelect}>
        Lecture littéraire
      </CardTypeCategory>
      <CardTypeCategory name='Visite littéraire' onClick={onSelect}>
        Visite littéraire
      </CardTypeCategory>
      <CardTypeCategory name='Contes' onClick={onSelect}>
        Contes
      </CardTypeCategory>
      <CardTypeCategory name="Cours d'écriture" onClick={onSelect}>
        Cours d'écriture
      </CardTypeCategory>
      <CardTypeCategory name='Autre expérience historique' onClick={onSelect}>
        Autre expérience historique
      </CardTypeCategory>
      <CardTypeCategory name='Autre expérience littéraire' onClick={onSelect}>
        Autre expérience littéraire
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Histoire;
