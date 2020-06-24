import { WEB_SOCKET_UPDATE } from '../actions/index.js';

const webSocketReducer = (state = null, action) => {
  switch (action.type) {
    case WEB_SOCKET_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default webSocketReducer;
