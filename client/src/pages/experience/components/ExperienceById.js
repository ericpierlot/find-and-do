import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../../../utils/components/Spinner';

const ExperienceById = () => {
  const [readThisID, setReadThisID] = useState('');
  const {
    title,
    aboutYou,
    category,
    precision,
    createdBy,
    exactAddress,
    createdAt,
    lieu,
    programme,
    type,
  } = readThisID;
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    // go to my api rest /api/experience/:id
    const fetchExperienceID = async () => {
      const { data } = await axios.get(`/api/experiences/id/${id}`);
      setReadThisID(data);
    };
    fetchExperienceID();
  }, []);

  // const render = readThisID.map((experience) => {
  //   return <div>Titre : {experience.title}</div>;
  // });
  return <>{readThisID ? <div>Titre : {title} </div> : <Spinner />}</>;
};

export default ExperienceById;
