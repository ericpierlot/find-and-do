import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Sports = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      sports: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name="Sport d'équipe" onClick={onSelect}>
        Sport d'équipe
      </CardTypeCategory>
      <CardTypeCategory name="Sports d'adrénaline" onClick={onSelect}>
        Sports d'adrénaline
      </CardTypeCategory>
      <CardTypeCategory name='Sports de combat' onClick={onSelect}>
        Sports de combat
      </CardTypeCategory>
      <CardTypeCategory name='Fitness' onClick={onSelect}>
        Fitness
      </CardTypeCategory>
      <CardTypeCategory name='Outdoor sport' onClick={onSelect}>
        Outdoor sport
      </CardTypeCategory>
      <CardTypeCategory name="Sports d'hiver" onClick={onSelect}>
        Sports d'hiver
      </CardTypeCategory>
      <CardTypeCategory name='Sport de montagne' onClick={onSelect}>
        Sport de montagne
      </CardTypeCategory>
      <CardTypeCategory name='Sports aquatiques' onClick={onSelect}>
        Sports aquatiques
      </CardTypeCategory>
      <CardTypeCategory name='Autre sports' onClick={onSelect}>
        Autre sports
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Sports;
