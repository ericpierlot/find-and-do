import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  width: 100%;
  margin-top: 90px;
  margin-bottom: 45px;
  @media (max-width: 920px) {
    margin: 0;
    overflow: auto;
  }
`;
const Wrapper = styled.section`
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  @media (max-width: 920px) {
    min-width: 100%;
    height: 100vh;
    border-radius: none;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0;
    box-shadow: none;
    min-height: 0;
    margin: 0;
    margin-bottom: 35px;
    padding: 1rem;
  }
`;

const Top = styled.header`
  width: 60%;
  margin: auto;
  padding-top: 1rem;

  @media (max-width: 920px) {
    width: 100%;
  }
`;
const Article = styled.article`
  width: 60%;
  margin: auto;
  padding-top: 3rem;
  display: flex;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 920px) {
    width: 100%;
  }
`;

const Flexbox = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 2px white solid;
  padding-bottom: 80px;
  margin-top: 10px;
  background-color: transparent;
  backdrop-filter: blur(20px);
  border-radius: 10px;
  padding: 1rem;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  cursor: pointer;
  @media (max-width: 920px) {
    width: 100%;
    border-bottom: 1px white solid;
  }
`;
const Messagerie = () => {
  const history = useHistory();
  return (
    <Section>
      <Wrapper>
        <Top>
          <h4>
            <Link to='/profil'>Mon compte</Link> → Messagerie
          </h4>
          <br />
          <h2>Messagerie</h2>
        </Top>
        <Article>
          <Flexbox onClick={() => history.push('/profil/messagerie/reception')}>
            <>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <strong>Boite de réception</strong>
              </div>
              <br />
              <br />
              <div style={{ width: '100%' }}>
                Vous avez actuellement 0 nouveau message.
              </div>
            </>
          </Flexbox>
          <Flexbox onClick={() => history.push('/profil/messagerie/envoi')}>
            <>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <strong>Boite d'envoi</strong>
              </div>
              <br />
              <br />
              <div style={{ width: '100%' }}>
                Vous avez actuellement envoyé X message, cliquez pour re-lire ou
                voir si ils ont été lu.
              </div>
            </>
          </Flexbox>
        </Article>
      </Wrapper>
    </Section>
  );
};

export default Messagerie;
