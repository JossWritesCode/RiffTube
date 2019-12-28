import { combineReducers } from 'redux';

export { riffReducer } from './riff-reducer.js';
export { modeReducer } from './mode-reducer.js';

export default combineReducers({
  riffReducer,
  modeReducer
});
