import { SEARCH_EXPERIENCE, SEE_EXPERIENCE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_EXPERIENCE:
      return {
        ...state,
        search: action.payload,
      };

    case SEE_EXPERIENCE:
      return action.payload;

    default:
      return state;
  }
};
