import React, { useReducer } from 'react';
import ExperienceContext from './experienceContext';
import experienceReducer from './experienceReducer';
import { SEARCH_EXPERIENCE } from '../types';
import axios from 'axios';

const ExperienceState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(experienceReducer, initialState);

  const saveExperiences = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(data, config);

    dispatch({
      type: SEARCH_EXPERIENCE,
      payload: res.data,
    });
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience: state,
        saveExperiences,
      }}
    >
      {props.children}
    </ExperienceContext.Provider>
  );
};

export default ExperienceState;
