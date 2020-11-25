import React from 'react';
import {
  ContenuCategory,
  CardTypeCategory,
} from './styles/ContenuCreateStyled';

const Visite = ({ experience, setExperience, isSelected, setIsSelected }) => {
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
      visite: false,
    });
  };

  return (
    <ContenuCategory>
      <CardTypeCategory name='Balade en voiture' onClick={onSelect}>
        Balade en voiture
      </CardTypeCategory>
      <CardTypeCategory name='Excursion en bateau' onClick={onSelect}>
        Excursion en bateau
      </CardTypeCategory>
      <CardTypeCategory name='Visite à vélo' onClick={onSelect}>
        Visite à vélo
      </CardTypeCategory>
      <CardTypeCategory name='Excursion en hélicoptère' onClick={onSelect}>
        Excursion en hélicoptère
      </CardTypeCategory>
      <CardTypeCategory name='Excursion en montgolfière' onClick={onSelect}>
        Excursion en montgolfière
      </CardTypeCategory>
      <CardTypeCategory name='Leçon de vol' onClick={onSelect}>
        Leçon de vol
      </CardTypeCategory>
      <CardTypeCategory name='Visite de musées' onClick={onSelect}>
        Visite de musées
      </CardTypeCategory>
      <CardTypeCategory
        name='Visite sur le thème de la photographie'
        onClick={onSelect}
      >
        Visite sur le thème de la photographie
      </CardTypeCategory>
      <CardTypeCategory name='Excursion en avion' onClick={onSelect}>
        Excursion en avion
      </CardTypeCategory>
      <CardTypeCategory name='Visite à trottinette' onClick={onSelect}>
        Visite à trottinette
      </CardTypeCategory>
      <CardTypeCategory name='Virée shopping' onClick={onSelect}>
        Virée shopping
      </CardTypeCategory>
      <CardTypeCategory name='Visite de site emblématique' onClick={onSelect}>
        Visite de site emblématique
      </CardTypeCategory>
      <CardTypeCategory name='Visite à pied' onClick={onSelect}>
        Visite à pied
      </CardTypeCategory>
      <CardTypeCategory name='Voyage en train' onClick={onSelect}>
        Voyage en train
      </CardTypeCategory>
      <CardTypeCategory name='Autres activités de transport' onClick={onSelect}>
        Autres activités de transport
      </CardTypeCategory>
    </ContenuCategory>
  );
};

export default Visite;
