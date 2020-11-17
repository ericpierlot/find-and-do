import React from 'react';

import styled from 'styled-components';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  justify-content: space-between;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  width: 300px;
  border-radius: 10px;
  padding: 1rem;
  text-align: justify;
  flex: 0 0 auto;
  margin: 15px;
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
      <div>
        <img
          src={Image}
          alt={ImageAlt}
          className='svg'
          style={{
            height: '20px',
            width: '20px',
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%)',
          }}
        />
      </div>
      <p style={{ textAlign: 'center' }}>{Title}</p>
    </DivWrapper>
  );

  const CardComputer = (
    <DivWrapper>
      <div>
        <img
          src={Image}
          alt={ImageAlt}
          className='svg'
          style={{ height: '20px', width: '20px' }}
        />
      </div>
      <h4 style={{ paddingTop: '1rem' }}>{Title}</h4>
      <h5 style={{ paddingTop: '1rem', fontWeight: 'normal' }}>
        {Description}
      </h5>
    </DivWrapper>
  );

  return <>{isOnMobile ? CardOnMobile : CardComputer}</>;
};

export default Card;
