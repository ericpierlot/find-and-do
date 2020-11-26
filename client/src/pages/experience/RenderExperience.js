import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceContext from '../../context/experience/experienceContext';
import {} from '../../css/styled/Profil/styled';
import { v4 as uuidv4 } from 'uuid';
import CardExperience from './components/CardExperience';
import styled from 'styled-components';
import { Section, Article } from '../../css/styled/Experience/styled';

const Wrapper = styled.section`
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
  min-height: 90vh;
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

const DivWrapper = styled.button`
  background-color: transparent;
  backdrop-filter: blur(5px);
  width: 200px;
  border: whitesmoke 2px solid;
  box-shadow: 0px 0.2em 0.5em rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 1rem;
  margin: 15px;
  text-align: center;

  @media (max-width: 920px) {
    width: 200px;
  }
`;

const RenderExperience = () => {
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const results = experience.search;

  if (!results) {
    return <Redirect to='/' />;
  }

  console.log(results);
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

  const test = () => {
    const array = [];
    for (const [category, value] of Object.entries(counts)) {
      array.push(`${category} (${value})`);
    }

    return array;
  };

  const cateMap = test().map((item) => {
    const uniqueID = uuidv4();
    return <DivWrapper key={uniqueID}>{item}</DivWrapper>;
  });
  // const test = NombreExpByCategory.map((cat) => {
  //   console.log('cat: ', cat);
  // });

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
      <Wrapper>
        {cateMap}
        <Article>{renderExperience}</Article>
      </Wrapper>
    </Section>
  );
};
export default RenderExperience;
