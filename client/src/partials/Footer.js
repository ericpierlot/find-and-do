import React from 'react';
import styled from 'styled-components';

const DivMain = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  backdrop-filter: blur(30px) contrast(120%);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bolder;
  }
  @media (max-width: 920px) {
    height: 5vh;
  }
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: auto;
`;

const Footer = () => {
  return (
    <footer>
      <DivMain>
        <span>
          <a href='https://ericpierlot.github.io/portfolio/' target='blank'>
            Eric Pierlot
          </a>
          {' - '}
          Tous droits réservés{' '}
          <span role='img' aria-label='Love you'>
            🤟
          </span>
        </span>
      </DivMain>
    </footer>
  );
};

export default Footer;
