import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import ExperienceContext from '../../context/experience/experienceContext';
import {} from '../../css/styled/Profil/styled';
import { v4 as uuidv4 } from 'uuid';

const RenderExperience = () => {
  const experienceContext = useContext(ExperienceContext);
  const { experience } = experienceContext;
  const results = experience.search;

  if (!results) {
    return <Redirect to='/' />;
  }

  // To work on render without enter research
  // const fake = {
  //   1: {
  //     _id: '12',
  //     title: 'Mon experience',
  //     description: 'la description',
  //   },
  //   2: {
  //     _id: '13',
  //     title: 'Mon experience 2',
  //     description: 'la description',
  //   },
  //   3: {
  //     _id: '14',
  //     title: 'Mon experience 2',
  //     description: 'la description',
  //   },
  //   4: {
  //     _id: '15',
  //     title: 'Mon experience 2',
  //     description: 'la description',
  //   },
  //   5: {
  //     _id: '16',
  //     title: 'Mon experience 2',
  //     description: 'la description',
  //   },
  // };

  // console.log(fake);

  console.log(results);

  const renderExperience = results.map((res, index) => {
    const resultID = uuidv4();
    return (
      <div key={resultID}>
        <div>{res.title}</div>
        <div>{res.createdBy}</div>
        <div>{res.description}</div>
        <div>{res.city}</div>
        <div></div>

        <br />
        <br />
      </div>
    );
  });
  return (
    <>
      <div id='send' onClick={() => console.log('')}></div>
      {renderExperience}
    </>
  );
};
export default RenderExperience;
