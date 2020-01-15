import {
  SET_VIDEO_ID,
  DELETE_RIFF,
  SAVE_RIFF,
  CREATE_TEMP_AUDIO_RIFF,
  CREATE_TEMP_TEXT_RIFF,
  SAVE_TEMP_AUDIO,
  CANCEL_EDIT,
  EDIT_RIFF,
  LOAD_RIFF,
  RIFF_LOADED,
  RECEIVE_RIFF_LIST,
  SAVE_RIFF_SUCCESS
} from '../actions/index.js';

let initialState = {
  all: [],
  temp: null,
  editIndex: null
};

const riffsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return initialState;
    case CREATE_TEMP_AUDIO_RIFF:
    case CREATE_TEMP_TEXT_RIFF:
      return {
        ...state,
        temp: {
          ...state.temp,
          type: action.type === CREATE_TEMP_AUDIO_RIFF ? 'audio' : 'text',
          // @ts-ignore
          // rifftubePlayer isn't normally on the window object so this throws an error but it works.
          time: window.rifftubePlayer.getCurrentTime(),
          video_id: action.videoID,
          tempId: new Date().getUTCMilliseconds() // used to get perm id from server
        },
        editIndex: null
      };
    case EDIT_RIFF:
      return {
        ...state,
        temp: { ...state.all[action.payload] }, // copy specified riff to tempRiff
        editIndex: action.payload
      };
    case DELETE_RIFF: {
      let ret = { ...state };

      ret.all = ret.all.filter( el => el.id !== action.id );

      /*let index = ret.all.findIndex(el => el.id === action.id);

      console.log( "delete riff reducer", index );

      console.log( ret );

      ret.all.splice(index, 1);*/

      return ret;
    }
    case SAVE_TEMP_AUDIO:
      return {
        ...state,
        temp: {
          ...state.temp,
          duration: action.duration,
          payload: action.payload
        }
      };
    case CANCEL_EDIT:
      return {
        ...state,
        temp: null,
        editIndex: null
      };
    case RECEIVE_RIFF_LIST:
      return {
        ...state,
        all: [
          ...state.all,
          ...action.payload.body.map(el => ({
            ...el,
            time: el.start_time,
            payload: el.isText ? el.text : null,
            type: el.isText ? 'text' : 'audio'
          }))
        ]
      };
    case SAVE_RIFF_SUCCESS:
      if (action.payload.type === 'add') {
        let riffs = [...state.all];
        riffs.forEach((el, ind, arr) => {
          if (el.tempId === action.payload.tempId)
            arr[ind] = { ...el, id: action.payload.id };
          //el.id = action.payload.id;
        });
        let ret = { ...state, all: riffs };
        return ret;
      } else return state;
    case SAVE_RIFF: {
      let riff = { ...state.temp, ...action.payload };
      let riffs;

      // adding a new riff:
      if (state.editIndex === null) riffs = [...state.all, riff];
      // EDIT_MODE (existing riff):
      else {
        riffs = [...state.all];
        riffs[state.editIndex] = riff;
      }

      return {
        //        ...state, // not needed because the state is fully specified
        all: riffs,
        temp: null,
        editIndex: null
      };
    }
    case LOAD_RIFF:
      let ret = { ...state }; // will this work?
      ret.all[action.payload].loading = true;
      return ret;
    case RIFF_LOADED: {
      const b = new Blob(new Array(action.payload), { type: 'audio/webm' });
      let riffs = [...state.all];
      riffs.forEach(el => {
        if (el.id === action.id) {
          el.payload = b;
          el.loading = false;
        }
      });
      let ret = { ...state, all: riffs };

      // if this is being edited currently, tempRiff needs to be updated as well
      // editIndex != null simply means that something is being edited
      if (state.editIndex !== null && state.temp.id === action.id)
        ret.temp = { ...ret.temp, payload: b };

      return ret;
    }
    default:
      return state;
  }
};

export default riffsReducer;
