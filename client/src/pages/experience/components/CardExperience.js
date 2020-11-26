import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DivWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
  backdrop-filter: blur(6px);
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  width: 400px;
  border-radius: 10px;
  margin: 15px;
  border: 2px solid whitesmoke;
  transition: box-shadow 250ms ease;
  transition: transform 250ms ease;
  cursor: pointer;
  :hover {
    backdrop-filter: none;
    box-shadow: 0px 0.2em 2.5em rgba(0, 0, 0, 0.3);
    transform: scale(1.025);
  }
  @media (max-width: 920px) {
    width: 90%;
    margin-bottom: 20vh;
  }
`;

const IMG = styled.div`
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
`;

const Head = styled.div`
  padding-left: 1rem;
  padding-top: 1rem;
  width: 100%;
  background-color: rgba(241, 90, 100, 0.4);
  padding-bottom: 1rem;
  @media (max-width: 920px) {
    width: 100%;
  }
`;
const CardExperience = ({
  title,
  programme,
  city,
  category,
  ID,
  goToThisExperience,
}) => {
  // Si le programme est trop long, on le réduit et on prévient !
  const programmeCutted = () => {
    const result = programme.slice(0, 150);
    return result;
  };

  return (
    <Link to={`experiences/id/${ID}`}>
      <DivWrapper>
        <IMG
          style={{
            background: 'url(https://source.unsplash.com/random/300x150)',
          }}
        />
        <Head>
          <h3 style={{ fontFamily: 'Poppins' }}>{title}</h3>
        </Head>
        <Article>
          <div style={{ marginTop: '10px' }}>
            {programme.length > 150 ? (
              <>
                {programmeCutted()}
                ...<u>lire la suite</u>
              </>
            ) : (
              programme
            )}
          </div>
          <div
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <strong>{city}</strong>
            <strong>{category}</strong>
          </div>
        </Article>
      </DivWrapper>
    </Link>
  );
};

export default CardExperience;
