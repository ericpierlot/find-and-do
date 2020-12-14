import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DivWrapper = styled.div`
  display: flex;
  height: 400px;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  width: 400px;
  border-radius: 15px;
  margin: 15px;
  border: 3px solid transparent;
  background-clip: padding-box;
  transition: all 250ms ease;
  color: ${({ theme }) => theme.textinvert};
  cursor: pointer;
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 920px) {
    width: 90%;
  }
`;

const IMG = styled.div`
  background-size: cover;
  height: 150px;
  width: 100%;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Article = styled.div`
  padding: 1rem;
  height: 125px;
`;

const Bas = styled.div`
  padding: 1rem;
`;

const Head = styled.div`
  padding-left: 1rem;
  padding-top: 1rem;
  width: 100%;
  background-color: rgba(241, 90, 100, 0.1);
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
          <h3 style={{ fontFamily: 'Poppins', textDecoration: 'none' }}>
            {title}
          </h3>
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
        </Article>
        <Bas>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div>{city}</div>
            <div>{category}</div>
          </div>
        </Bas>
      </DivWrapper>
    </Link>
  );
};

export default CardExperience;
