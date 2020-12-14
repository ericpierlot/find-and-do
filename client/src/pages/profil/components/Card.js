import React from 'react';

import styled from 'styled-components';

const DivWrapper = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  justify-content: space-between;
  width: 300px;
  border-radius: 15px;
  border: 3px solid transparent;
  background-clip: padding-box;
  padding: 1rem;
  flex: 0 0 auto;
  margin: 15px;
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 1200px) {
    width: 225px;
  }

  @media (max-width: 920px) {
    width: 200px;
    height: 150px;
    justify-content: space-evenly;
  }
`;
const Card = ({ Image, ImageAlt, Title, Description }) => {
  const isOnMobile = window.matchMedia('(max-width: 920px)').matches;

  const CardOnMobile = (
    <DivWrapper>
      <div style={{ textAlign: 'center' }}>{Image}</div>
      <p style={{ textAlign: 'center' }}>{Title}</p>
    </DivWrapper>
  );

  const CardComputer = (
    <DivWrapper>
      <div>{Image}</div>
      <h4 style={{ paddingTop: '1rem' }}>{Title}</h4>
      <h5 style={{ paddingTop: '1rem', fontWeight: 'normal' }}>
        {Description}
      </h5>
    </DivWrapper>
  );

  return <>{isOnMobile ? CardOnMobile : CardComputer}</>;
};

export default Card;
