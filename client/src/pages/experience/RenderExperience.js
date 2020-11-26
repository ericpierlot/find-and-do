import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceContext from '../../context/experience/experienceContext';
import {} from '../../css/styled/Profil/styled';
import { v4 as uuidv4 } from 'uuid';
import CardExperience from './components/CardExperience';

const RenderExperience = () => {
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const results = experience.search;

  if (!results) {
    return <Redirect to='/' />;
  }

  console.log(results);

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
  return <>{renderExperience}</>;
};
export default RenderExperience;
