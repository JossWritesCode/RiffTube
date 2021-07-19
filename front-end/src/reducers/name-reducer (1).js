import { RECEIVE_RIFF_LIST, RECEIVE_NAME_UPDATE } from '../actions/index.js';

const nameReducer = (state = '', action) => {
  switch (action.type) {
    case RECEIVE_NAME_UPDATE:
    case RECEIVE_RIFF_LIST:
      return action.payload.name || ''; // hacky but added because no name is returned for view riffs
    default:
      return state;
  }
};

export default nameReducer;
