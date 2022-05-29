import { RECEIVE_RIFF_LIST, RECEIVE_NAME_UPDATE, LOAD_USER_DATA } from '../actions/index.js';

const nameReducer = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_NAME_UPDATE:
    case RECEIVE_RIFF_LIST:
    case LOAD_USER_DATA:
      return action.payload.name || state; // hacky but added because no name is returned for view riffs
    default:
      return state;
  }
};

export default nameReducer;
