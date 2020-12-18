import React from 'react';
import styled from 'styled-components';

const Navigation = styled.nav`
  width: 100%;

  padding: 1rem;
  ul {
    list-style-type: none;
    margin-bottom: 2rem;
  }
  li {
    color: white;

    margin-top: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(30px) contrast(120%);
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
    border: 3px solid transparent;
    background-clip: padding-box;
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
  @media (max-width: 840px) {
  }
`;

const NavCreateExperience = ({ setLiSelected, experience }) => {
  return (
    <Navigation>
      <ul style={{ listStyleType: 'none' }}>
        <li
          onClick={() => {
            setLiSelected(0);
            window.scrollTo(0, 0);
          }}
        >
          Type d'activité
        </li>
        <li
          style={{
            pointerEvents: experience.type ? '' : 'none',
            opacity: experience.type ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(1);
            window.scrollTo(0, 0);
          }}
        >
          Lieu
        </li>
        <li
          style={{
            pointerEvents: experience.type && experience.lieu ? '' : 'none',
            opacity: experience.type && experience.lieu ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(2);
            window.scrollTo(0, 0);
          }}
        >
          Votre thème
        </li>
      </ul>
      <ul style={{ listStyleType: 'none' }}>
        <li
          style={{
            pointerEvents: experience.theme.precision !== '' ? '' : 'none',
            opacity: experience.theme.precision !== '' ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(3);
            window.scrollTo(0, 0);
          }}
        >
          Au programme
        </li>
        <li
          style={{
            pointerEvents: experience.programme ? '' : 'none',
            opacity: experience.programme ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(4);
            window.scrollTo(0, 0);
          }}
        >
          A propos de vous
        </li>
        <li
          style={{
            pointerEvents: experience.aboutYou ? '' : 'none',
            opacity: experience.aboutYou ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(5);
            window.scrollTo(0, 0);
          }}
        >
          Adresse exacte
        </li>
        <li
          style={{
            pointerEvents: experience.exactAddress ? '' : 'none',
            opacity: experience.exactAddress ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(6);
            window.scrollTo(0, 0);
          }}
        >
          Titre
        </li>
        <li
          style={{
            pointerEvents: experience.title ? '' : 'none',
            opacity: experience.title ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(7);
            window.scrollTo(0, 0);
          }}
        >
          Photos
        </li>
      </ul>
      <ul style={{ listStyleType: 'none' }}>
        <li
          style={{
            pointerEvents: experience.title ? '' : 'none',
            opacity: experience.title ? '' : '0.2',
          }}
          onClick={() => {
            setLiSelected(8);
            window.scrollTo(0, 0);
          }}
        >
          Récapitulatif
        </li>
      </ul>
    </Navigation>
  );
};

export default NavCreateExperience;
