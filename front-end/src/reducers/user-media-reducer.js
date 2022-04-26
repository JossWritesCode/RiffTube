import {
  CREATE_TEMP_AUDIO_RIFF,
  } from '../actions/index.js';
  
  const userMediaRecorder = (state = null, action) => {
    switch (action.type) {
    case CREATE_TEMP_AUDIO_RIFF:
        return action.stream;
      default:
        return state;
    }
  };
  
  export default userMediaRecorder;
  