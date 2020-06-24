import { RECEIVE_RIFF_META } from '../actions/index.js';

let initialState = [];

const riffsMetaReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RIFF_META:
      return action.payload.body.map((el) => ({
        ...el,
        time: el.start_time,
        payload: el.isText ? el.text : null,
        type: el.isText ? 'text' : 'audio',
      }));
    default:
      return state;
  }
};

export default riffsMetaReducer;
