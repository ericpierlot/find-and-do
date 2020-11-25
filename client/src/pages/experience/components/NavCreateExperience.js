import React from 'react';
import styled from 'styled-components';

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  width: 20%;
  background-color: rgba(255, 255, 255, 0.2);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;
  padding: 2rem;
  ul {
    list-style-type: none;
    margin-bottom: 2rem;
  }
  li {
    color: white;
    margin-top: 1rem;
    background-color: rgba(255, 255, 255, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.5);
    padding: 1rem;
    border-radius: 15px;
    transition: background-color 900ms ease;
    :hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.1);
    }
    :active {
      background-color: #e03e3e;
    }
  }
`;

const NavCreateExperience = ({ setLiSelected, experience }) => {
  return (
    <Navigation>
      <h2>Votre idée</h2>
      <ul style={{ listStyleType: 'none' }}>
        <li onClick={() => setLiSelected(0)}>Type d'activité</li>
        <li
          style={{
            pointerEvents: experience.type ? '' : 'none',
            opacity: experience.type ? '' : '0.2',
          }}
          onClick={() => setLiSelected(1)}
        >
          Lieu
        </li>
        <li
          style={{
            pointerEvents: experience.type && experience.lieu ? '' : 'none',
            opacity: experience.type && experience.lieu ? '' : '0.2',
          }}
          onClick={() => setLiSelected(2)}
        >
          Votre thème
        </li>
      </ul>
      <h2>Page de l'expérience</h2>
      <ul style={{ listStyleType: 'none' }}>
        <li
          style={{
            pointerEvents: experience.theme.precision !== '' ? '' : 'none',
            opacity: experience.theme.precision !== '' ? '' : '0.2',
          }}
          onClick={() => setLiSelected(3)}
        >
          Au programme
        </li>
        <li
          style={{
            pointerEvents: experience.programme ? '' : 'none',
            opacity: experience.programme ? '' : '0.2',
          }}
          onClick={() => setLiSelected(4)}
        >
          A propos de vous
        </li>
        <li
          style={{
            pointerEvents: experience.aboutYou ? '' : 'none',
            opacity: experience.aboutYou ? '' : '0.2',
          }}
          onClick={() => setLiSelected(5)}
        >
          Adresse exacte
        </li>
        <li
          style={{
            pointerEvents: experience.exactAddress ? '' : 'none',
            opacity: experience.exactAddress ? '' : '0.2',
          }}
          onClick={() => setLiSelected(6)}
        >
          Titre
        </li>
        <li
          style={{
            pointerEvents: experience.title ? '' : 'none',
            opacity: experience.title ? '' : '0.2',
          }}
          onClick={() => setLiSelected(7)}
        >
          Photos
        </li>
      </ul>
      <h2>Récapitulatif & Envoi</h2>
      <ul style={{ listStyleType: 'none' }}>
        <li
          style={{
            pointerEvents: experience.title ? '' : 'none',
            opacity: experience.title ? '' : '0.2',
          }}
          onClick={() => setLiSelected(8)}
        >
          Récapitulatif
        </li>
      </ul>
    </Navigation>
  );
};

export default NavCreateExperience;
