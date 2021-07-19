import {
  SET_VIDEO_ID,
  EDIT_RIFF,
  SAVE_RIFF_SUCCESS,
  SAVE_RIFF,
  RIFF_LOADED,
  SAVE_TEMP_AUDIO,
  CANCEL_EDIT,
  LOAD_RIFF,
} from '../actions/index.js';

let initialState = { saving: {}, loading: {}, temp: null, all: {} };

const riffsAudioReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VIDEO_ID:
      return initialState;
    case EDIT_RIFF:
      return {
        ...state,
        temp: state.all[action.id], // copy specified riff audio to temp
      };
    case SAVE_RIFF_SUCCESS: {
      if (action.payload.type === 'add') {
        const { [action.payload.tempId]: foo, ...saving } = state.saving; // foo is discarded
        return {
          ...state,
          saving,
          all: {
            ...state.all,
            [action.payload.id]: state.saving[action.payload.tempId],
          },
        };
      } else return state;
    }
    case SAVE_RIFF: {
      // adding a new riff:
      if (state.editIndex === null)
        return {
          ...state,
          saving: {
            ...state.saving,
            [action.riff.tempId]: true,
          },
        };
      // EDIT_MODE (existing riff):
      else
        return {
          ...state,
          all: {
            ...state.all,
            [action.riff.id]: action.payload.payload,
          },
        };
    }
    case LOAD_RIFF: {
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload]: true,
        },
      };
    }
    case RIFF_LOADED: {
      const { [action.id]: foo, ...loading } = state.loading; // foo is discarded
      return {
        ...state,
        loading,
        all: {
          [action.id]: new Blob(new Array(action.payload), {
            type: 'audio/mp3',
          }),
        },
      };
    }
    case SAVE_TEMP_AUDIO:
      return {
        ...state,
        temp: action.payload,
      };
    case CANCEL_EDIT:
      return {
        ...state,
        temp: null,
      };
    default:
      return state;
  }
};

export default riffsAudioReducer;
