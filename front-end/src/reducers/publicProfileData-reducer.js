import { LOAD_PUBLIC_USER_DATA } from '../actions/index.js';

const publicProfileDataReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_PUBLIC_USER_DATA:
      return action.payload.body;

    default:
      return state;
  }
};

export default publicProfileDataReducer;
