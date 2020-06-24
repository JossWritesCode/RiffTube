import { RECEIVE_RIFF_LIST } from '../actions/index.js';

const useridReducer = (state = null, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_LIST:
      return action.payload.user_id || 0; // hacky but added because no user-id is returned for view riffs
    default:
      return state;
  }
};

export default useridReducer;
