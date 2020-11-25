import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Bienetre = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      bienetre: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Beauté' onClick={onSelect}>
        Beauté
      </CardTypeCategory>
      <CardTypeCategory name='Divination' onClick={onSelect}>
        Divination
      </CardTypeCategory>
      <CardTypeCategory name='Pleine conscience' onClick={onSelect}>
        Pleine conscience
      </CardTypeCategory>
      <CardTypeCategory name='Santé holistique' onClick={onSelect}>
        Santé holistique
      </CardTypeCategory>
      <CardTypeCategory name='SPA' onClick={onSelect}>
        SPA
      </CardTypeCategory>
      <CardTypeCategory name='Thérapie du corps' onClick={onSelect}>
        Thérapie du corps
      </CardTypeCategory>
      <CardTypeCategory name='Yoga' onClick={onSelect}>
        Yoga
      </CardTypeCategory>
      <CardTypeCategory name="Etat d'esprit" onClick={onSelect}>
        Etat d'esprit
      </CardTypeCategory>
      <CardTypeCategory name='Autre expérience de bien-être' onClick={onSelect}>
        Autre expérience de bien-être
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Bienetre;
