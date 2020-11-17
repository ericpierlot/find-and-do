import React, { useReducer } from 'react';
import ExperienceContext from './experienceContext';
import experienceReducer from './experienceReducer';
import { SEARCH_EXPERIENCE, SEE_EXPERIENCE } from '../types';
import axios from 'axios';

const ExperienceState = (props) => {
  const initialState = [];

  const [state, dispatch] = useReducer(experienceReducer, initialState);

  // Set Alert
  const saveExperiences = async (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.get(data, config);
    dispatch({
      type: SEARCH_EXPERIENCE,
      payload: res.data,
    });
  };

  // (FUTUR) Get the ID of owner, to go to see his profile and his experience in new page.
  const seeExperience = (data) => {
    dispatch({
      type: SEE_EXPERIENCE,
      payload: {
        data,
      },
    });
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience: state,
        saveExperiences,
        seeExperience,
      }}
    >
      {props.children}
    </ExperienceContext.Provider>
  );
};

export default ExperienceState;
