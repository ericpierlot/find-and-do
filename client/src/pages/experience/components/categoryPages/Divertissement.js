import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Divertissement = ({
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
      divertissement: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name="Feux d'artifice" onClick={onSelect}>
        Feux d'artifice
      </CardTypeCategory>
      <CardTypeCategory name='Cirque' onClick={onSelect}>
        Cirque
      </CardTypeCategory>
      <CardTypeCategory name='Comédie' onClick={onSelect}>
        Comédie
      </CardTypeCategory>
      <CardTypeCategory name='Danse' onClick={onSelect}>
        Danse
      </CardTypeCategory>
      <CardTypeCategory name='Jeux' onClick={onSelect}>
        Jeux
      </CardTypeCategory>
      <CardTypeCategory name='Magie' onClick={onSelect}>
        Magie
      </CardTypeCategory>
      <CardTypeCategory name='Films, télévision ou radio' onClick={onSelect}>
        Films, télévision ou radio
      </CardTypeCategory>
      <CardTypeCategory name='Musique' onClick={onSelect}>
        Musique
      </CardTypeCategory>
      <CardTypeCategory name='Sporting event' onClick={onSelect}>
        Sporting event
      </CardTypeCategory>
      <CardTypeCategory name='Surnaturel' onClick={onSelect}>
        Surnaturel
      </CardTypeCategory>
      <CardTypeCategory name='Théàtre' onClick={onSelect}>
        Théàtre
      </CardTypeCategory>
      <CardTypeCategory name='Vie nocturne' onClick={onSelect}>
        Vie nocturne
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Divertissement;
