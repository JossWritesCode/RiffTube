import { RECEIVE_RIFF_LIST, LOAD_USER_DATA } from '../actions/index.js';

const useridReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_LIST:
      return action.payload.user_id || state; // hacky but added because no user-id is returned for view riffs
    case LOAD_USER_DATA:
      return action.payload.userid; // so inconsistent
    default:
      return state;
  }
};

export default useridReducer;
