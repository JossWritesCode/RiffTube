import { LOAD_USER_DATA } from '../actions/index.js';

const userDataReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD_USER_DATA:
      return action.payload.body;

    default:
      return state;
  }
};

export default userDataReducer;
