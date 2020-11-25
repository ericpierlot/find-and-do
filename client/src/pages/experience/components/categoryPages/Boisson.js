import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Boisson = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      boisson: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Bière' onClick={onSelect}>
        Bière
      </CardTypeCategory>
      <CardTypeCategory name='Café' onClick={onSelect}>
        Café
      </CardTypeCategory>
      <CardTypeCategory name='Saké' onClick={onSelect}>
        Saké
      </CardTypeCategory>
      <CardTypeCategory name='Spiritueux' onClick={onSelect}>
        Spiritueux
      </CardTypeCategory>
      <CardTypeCategory name='Thé' onClick={onSelect}>
        Thé
      </CardTypeCategory>
      <CardTypeCategory name='Vin' onClick={onSelect}>
        Vin
      </CardTypeCategory>
      <CardTypeCategory
        name='Autre expérience autour de boissons'
        onClick={onSelect}
      >
        Autre expérience autour de boissons
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Boisson;
