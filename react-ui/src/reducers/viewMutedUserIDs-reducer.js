import {
  SET_VIDEO_ID,
  TOGGLE_VIEW_USERID_MUTED
} from '../actions/index.js';

const viewMutedUserIDsReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return {};
    case TOGGLE_VIEW_USERID_MUTED:
      return {
            ...state,
            [action.id]: !state[action.id]
        };
    default:
      return state;
  }
};

export default viewMutedUserIDsReducer;