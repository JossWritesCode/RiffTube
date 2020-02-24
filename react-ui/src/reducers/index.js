import { combineReducers } from 'redux';

import riffsReducer from './riffs-reducer';
// import riffsMeta from './riffs-meta';
import modeReducer from './mode-reducer';
import googleUserReducer from './googleUser-reducer';
import riffsPlayingReducer from './riffsPlaying-reducer';
import viewMutedUserIDsReducer from './viewMutedUserIDs-reducer';
import nameReducer from './name-reducer';
import videoIDReducer from './videoID-reducer';

export default combineReducers({
  riffs: riffsReducer,
  // riffsMeta: riffsMeta,
  mode: modeReducer,
  googleUser: googleUserReducer,
  riffsPlaying: riffsPlayingReducer,
  viewMutedUserIDs: viewMutedUserIDsReducer,
  name: nameReducer,
  videoID: videoIDReducer
});
