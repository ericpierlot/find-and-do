import { SEARCH_EXPERIENCE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case SEARCH_EXPERIENCE:
      return {
        ...state,
        search: action.payload,
      };

    default:
      return state;
  }
};
