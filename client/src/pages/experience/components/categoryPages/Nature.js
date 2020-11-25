import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Nature = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      nature: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Voyage en sac à dos' onClick={onSelect}>
        Voyage en sac à dos
      </CardTypeCategory>
      <CardTypeCategory name='Camping' onClick={onSelect}>
        Camping
      </CardTypeCategory>
      <CardTypeCategory name='Randonnée' onClick={onSelect}>
        Randonnée
      </CardTypeCategory>
      <CardTypeCategory name='Ciel nocturne' onClick={onSelect}>
        Ciel nocturne
      </CardTypeCategory>
      <CardTypeCategory
        name='Science naturelle et causes environnementale'
        onClick={onSelect}
      >
        Science naturelle et causes environnementale
      </CardTypeCategory>
      <CardTypeCategory name='Nature et écologie' onClick={onSelect}>
        Nature et écologie
      </CardTypeCategory>
      <CardTypeCategory name='Plantes et agriculture' onClick={onSelect}>
        Plantes et agriculture
      </CardTypeCategory>
      <CardTypeCategory name='Autre activité de plein air' onClick={onSelect}>
        Autre activité de plein air
      </CardTypeCategory>
      <CardTypeCategory
        name='Autre expérience sur la nature'
        onClick={onSelect}
      >
        Autre expérience sur la nature
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Nature;
