import { LOAD_PUBLIC_USER_DATA } from '../actions/index.js';

const publicProfileNameReducer = (state = '', action) => {
  switch (action.type) {
    case LOAD_PUBLIC_USER_DATA:
      return action.payload.name;

    default:
      return state;
  }
};

export default publicProfileNameReducer;
