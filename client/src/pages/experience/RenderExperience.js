import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceContext from '../../context/experience/experienceContext';
import {} from '../../css/styled/Profil/styled';
import { v4 as uuidv4 } from 'uuid';
import CardExperience from './components/CardExperience';
import styled from 'styled-components';

const Section = styled.section`
  width: 90%;
  margin: auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and(min-width: 840px) {
    width: 80%;
  }
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.text};
  }
  @media (min-width: 840px) {
    flex-direction: row;
  }
`;

const DivWrapper = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(30px) contrast(120%);
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 30px 0px;
  width: 200px;
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  margin: 15px;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 920px) {
    width: 200px;
    margin-top: 20vh;
  }
`;

const RenderExperience = () => {
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const results = experience.search;

  if (!results) {
    return <Redirect to='/' />;
  }

  //Nombre d'expériences, par catégorie.
  const listingCategory = results.map((res) => {
    const { category } = res;
    return category;
  });

  const counts = listingCategory.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1,
    }),
    []
  );

  const arrayOfCategory = () => {
    const array = [];
    for (const [category, value] of Object.entries(counts)) {
      array.push(`${category} (${value})`);
    }

    return array;
  };

  const cateMap = arrayOfCategory().map((item) => {
    const uniqueID = uuidv4();
    return <DivWrapper key={uniqueID}>{item}</DivWrapper>;
  });

  const renderExperience = results.map((res) => {
    const { _id, title, programme, lieu, category } = res;
    const uniqueID = uuidv4();

    return (
      <div key={uniqueID}>
        <CardExperience
          ID={_id}
          title={title}
          programme={programme}
          city={lieu}
          category={category}
        />
      </div>
    );
  });
  return (
    <Section>
      <Container>
        <div style={{ display: 'flex' }}>{cateMap}</div>
        <Wrapper>{renderExperience}</Wrapper>
      </Container>
    </Section>
  );
};
export default RenderExperience;
