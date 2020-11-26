import styled from 'styled-components';

const Section = styled.section`
  margin: auto;
  width: 100%;
  margin-top: 90px;
  margin-bottom: 45px;
  @media (max-width: 920px) {
    margin: 0;
  }
`;

const Wrapper = styled.section`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
  min-height: 90vh;
  margin: auto;
  margin-top: 5vh;
  max-width: 90vw;
  border-radius: 30px;

  background-color: rgba(255, 255, 255, 0.2);

  @media (max-width: 920px) {
    max-width: 100vw;
    margin-top: 0;
    border-radius: 0;
  }
`;

const Top = styled.header`
  width: 80%;
  margin: auto;
  padding-top: 1rem;

  @media (max-width: 920px) {
    width: 100%;
  }
`;
const Article = styled.article`
  width: 80%;
  margin: auto;
  padding-top: 3rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  a {
    text-decoration: none;
    color: black;
  }
  @media (max-width: 1400px) {
    width: 100%;
    flex-direction: row;
  }

  @media (max-width: 1020px) {
    width: 100%;
    flex-direction: column;
  }
`;

export { Article, Top, Section, Wrapper };
