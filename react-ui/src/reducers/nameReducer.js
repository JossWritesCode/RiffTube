import {
  RECEIVE_RIFF_LIST,
  RECEIVE_NAME_UPDATE
} from '../actions/index.js';

export const riffReducer = (state = "", action) => {
  switch (action.type) {
    case RECEIVE_NAME_UPDATE:
    case RECEIVE_RIFF_LIST:
      return action.payload.name;
    default:
      return state;
  }
};