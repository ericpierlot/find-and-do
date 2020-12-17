import React, { useReducer, useState } from 'react';
import ExperienceContext from './experienceContext';
import experienceReducer from './experienceReducer';
import { SEARCH_EXPERIENCE } from '../types';
import axios from 'axios';

const ExperienceState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(experienceReducer, initialState);
  const [apiURL, setApiURL] = useState('');

  const saveExperiences = async (url) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(url, config);

    dispatch({
      type: SEARCH_EXPERIENCE,
      payload: data,
    });

    setApiURL(url);
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience: state,
        saveExperiences,
        apiURL,
      }}
    >
      {props.children}
    </ExperienceContext.Provider>
  );
};

export default ExperienceState;
