import React from 'react';
import styled from 'styled-components';
import ImageExp from '../../../images/experiences/experience1.jpg';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  width: 300px;
  border-radius: 10px;
  flex: 0 0 auto;
  margin: 15px;
  transition: box-shadow 250ms ease;
  transition: transform 250ms ease;
  cursor: pointer;
  :hover {
    box-shadow: 0px 0.2em 2.5em rgba(0, 0, 0, 0.3);
    transform: scale(1.025);
  }
  @media (max-width: 920px) {
    width: 90%;
    margin: auto;
    margin-bottom: 15px;
    margin-bottom: 20vh;
  }
`;

const IMG = styled.div`
  background: url(${ImageExp});
  background-size: cover;
  height: 150px;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Article = styled.article`
  padding: 1em;

  @media (max-width: 920px) {
    width: 100%;
    border-radius: 0;
    margin: auto;
  }
`;

const Head = styled.div`
  padding-left: 1rem;
  padding-top: 1rem;
  width: 100%;
  background-color: #f15e64;
  padding-bottom: 1rem;
  @media (max-width: 920px) {
    width: 100%;
  }
`;
const CardExperience = () => {
  return (
    <DivWrapper>
      <IMG />
      <Head>
        <h3 style={{ fontFamily: 'Poppins' }}>Titre de l'expérience</h3>
      </Head>
      <Article>
        <div style={{ marginTop: '10px' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut ad
          dignissimos dolor at beatae itaque atque sed consequatur
          exercitationem esse, doloribus iusto excepturi deleniti accusamus
          vero. Voluptates sed nihil assumenda.
        </div>
        <div style={{ marginTop: '20px' }}>
          <strong>VILLE</strong>
        </div>
      </Article>
    </DivWrapper>
  );
};

export default CardExperience;
