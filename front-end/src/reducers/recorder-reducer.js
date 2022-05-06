import {
    SET_RECORDER,
} from '../actions/index.js';

    const recorderReducer = (state = null, action) => {
      switch (action.type) {
      case SET_RECORDER:
          return action.payload;
        default:
          return state;
      }
    };
    
    export default recorderReducer;
    