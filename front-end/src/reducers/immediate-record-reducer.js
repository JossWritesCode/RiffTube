import {
    CREATE_TEMP_AUDIO_RIFF,
    SET_IMMEDIATE_OFF,
  } from '../actions/index.js';
  
  const immediateRecordReducer = (state = false, action) => {
    switch (action.type) {
      case CREATE_TEMP_AUDIO_RIFF:
        return action.immediateRecord;
      case SET_IMMEDIATE_OFF:
        return false;
      default:
        return state;
    }
  };
  
  export default immediateRecordReducer;
  