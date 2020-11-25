import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Culture = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      culture: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name="Cours sur l'entrepreneuriat" onClick={onSelect}>
        Cours sur l'entrepreneuriat
      </CardTypeCategory>
      <CardTypeCategory name='Danse culturelle' onClick={onSelect}>
        Danse culturelle
      </CardTypeCategory>
      <CardTypeCategory name='Festival culturel' onClick={onSelect}>
        Festival culturel
      </CardTypeCategory>
      <CardTypeCategory name='Conférience culturelle' onClick={onSelect}>
        Conférience culturelle
      </CardTypeCategory>
      <CardTypeCategory name='Visite culturelle' onClick={onSelect}>
        Visite culturelle
      </CardTypeCategory>
      <CardTypeCategory name="Visite d'usine" onClick={onSelect}>
        Visite d'usine
      </CardTypeCategory>
      <CardTypeCategory name='Cours sur la monde' onClick={onSelect}>
        Cours sur la monde
      </CardTypeCategory>
      <CardTypeCategory name='Cours de design graphique' onClick={onSelect}>
        Cours de design graphique
      </CardTypeCategory>
      <CardTypeCategory
        name='Cours de décoration intérieure'
        onClick={onSelect}
      >
        Cours de décoration intérieure
      </CardTypeCategory>
      <CardTypeCategory name='Cours de photographie' onClick={onSelect}>
        Cours de photographie
      </CardTypeCategory>
      <CardTypeCategory name='Séance photo' onClick={onSelect}>
        Séance photo
      </CardTypeCategory>
      <CardTypeCategory
        name="Visite sur le thème de l'art urbain"
        onClick={onSelect}
      >
        Visite sur le thème de l'art urbain
      </CardTypeCategory>
      <CardTypeCategory name='Cours de design visuel' onClick={onSelect}>
        Cours de design visuel
      </CardTypeCategory>
      <CardTypeCategory name="Autre expérience sur l'art" onClick={onSelect}>
        Autre expérience sur l'art
      </CardTypeCategory>
      <CardTypeCategory
        name='Autre expérience sur le design'
        onClick={onSelect}
      >
        Autre expérience sur le design
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Culture;
