import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceContext from '../../context/experience/experienceContext';
import {} from '../../css/styled/Profil/styled';
import { v4 as uuidv4 } from 'uuid';
import CardExperience from './components/CardExperience';
import styled from 'styled-components';

const RenderExperience = () => {
  const experienceContext = useContext(ExperienceContext);
  const { experience, saveExperiences, apiURL } = experienceContext;
  let results = [];
  let totalExperiences = [];
  if (experience.length === 0) {
    results = [];
  } else {
    results = experience.search.experiences;
    totalExperiences = experience.search.totalExperiences;
  }

  const [resultsCategory, setResultsCategory] = useState([]);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [page, setPage] = useState(1);

  if (results.length === 0) {
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

  const handleFilterCategory = (category) => {
    setCategoryClicked(true);
    const onlyCategory = results.filter((item) => {
      return item.category === category;
    });

    const resultCategory = onlyCategory.map((item) => {
      const { _id, title, programme, lieu, category } = item;
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

    setResultsCategory(resultCategory);
  };

  const cateMap = arrayOfCategory().map((item) => {
    const uniqueID = uuidv4();

    // Remove (x) from item (instead of 'name category (number)' I have now only 'name category')
    const array = item.split(' ');
    array.pop();
    const CategoryName = array.join(' ');
    return (
      <DivWrapper
        onClick={() => handleFilterCategory(CategoryName)}
        key={uniqueID}
      >
        {item}
      </DivWrapper>
    );
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

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    saveExperiences(`${apiURL.slice(0, -1)}${newPage}`);
  };
  const previousPage = () => {
    const newPage = page - 1;
    setPage(newPage);
    saveExperiences(`${apiURL.slice(0, -1)}${newPage}`);
  };
  return (
    <Section>
      <Container>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {cateMap}{' '}
          <DivWrapper onClick={() => setCategoryClicked(false)}>
            Toutes
          </DivWrapper>
        </div>
        <Wrapper>
          {categoryClicked ? resultsCategory : renderExperience}
        </Wrapper>
        {page > 1 ? (
          <Button onClick={previousPage}>Page précédente</Button>
        ) : (
          ''
        )}{' '}
        {totalExperiences > 5 && page * 5 < totalExperiences ? (
          <Button onClick={nextPage}>Page suivante</Button>
        ) : (
          ''
        )}
      </Container>
    </Section>
  );
};
export default RenderExperience;

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
    align-items: center;
    flex-wrap: wrap;
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
  outline: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  :hover {
    background-color: ${({ theme }) => theme.header};
  }
  @media (max-width: 920px) {
    width: 200px;
  }
`;

const Button = styled.button`
  margin-top: 2rem;
  width: 220px;
  text-align: center;
  padding: 0.3rem 1rem 0.3rem 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  height: 3rem;
  text-align: center;
  border: none;
  border-radius: 10px;
  transition: all 0.4s ease-in-out;
  background-color: #eb8282;

  font-weight: 600;
  :hover {
    border: 3px rgba(255, 255, 255, 0.2) solid;
    transition: all 0.4s ease-in-out;
  }
  :focus {
    outline: none;
  }
  margin-bottom: 1rem;
  border: 3px transparent solid;
  background-clip: padding-box;
`;
