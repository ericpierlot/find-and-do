import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Art = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      art: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory
        name="Visite sur le thème de l'architecture"
        onClick={onSelect}
      >
        Visite sur le thème de l'architecture
      </CardTypeCategory>
      <CardTypeCategory name="Cours d'art" onClick={onSelect}>
        Cours d'art
      </CardTypeCategory>
      <CardTypeCategory name='Exposition' onClick={onSelect}>
        Exposition
      </CardTypeCategory>
      <CardTypeCategory name='Visite de musées' onClick={onSelect}>
        Visite de musées
      </CardTypeCategory>
      <CardTypeCategory name='Atelier artisanat' onClick={onSelect}>
        Atelier artisanat
      </CardTypeCategory>
      <CardTypeCategory name='Animal de ferme' onClick={onSelect}>
        Animal de ferme
      </CardTypeCategory>
      <CardTypeCategory name='Cours de langue' onClick={onSelect}>
        Cours de langue
      </CardTypeCategory>
      <CardTypeCategory name='Visite de bureaux' onClick={onSelect}>
        Visite de bureaux
      </CardTypeCategory>
      <CardTypeCategory name='Débat politique' onClick={onSelect}>
        Débat politique
      </CardTypeCategory>
      <CardTypeCategory name='Cours de sciences' onClick={onSelect}>
        Cours de sciences
      </CardTypeCategory>
      <CardTypeCategory name='Conférience scientifique' onClick={onSelect}>
        Conférience scientifique
      </CardTypeCategory>
      <CardTypeCategory
        name='Visite sur le thème de la science'
        onClick={onSelect}
      >
        Visite sur le thème de la science
      </CardTypeCategory>
      <CardTypeCategory
        name='Conférence sur des enjeux sociaux'
        onClick={onSelect}
      >
        Conférence sur des enjeux sociaux
      </CardTypeCategory>
      <CardTypeCategory name='Visite sur des enjeux sociaux' onClick={onSelect}>
        Visite sur des enjeux sociaux
      </CardTypeCategory>
      <CardTypeCategory name='Bénévolat' onClick={onSelect}>
        Bénévolat
      </CardTypeCategory>
      <CardTypeCategory
        name='Autre expérience socioculturelle'
        onClick={onSelect}
      >
        Autre expérience socioculturelle
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Art;
