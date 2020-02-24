import { combineReducers } from 'redux';

import riffsReducer from './riffs-reducer';
import riffsMetaReducer from './riffsMeta-reducer';
import modeReducer from './mode-reducer';
import googleUserReducer from './googleUser-reducer';
import riffsPlayingReducer from './riffsPlaying-reducer';
import viewMutedUserIDsReducer from './viewMutedUserIDs-reducer';
import nameReducer from './name-reducer';
import videoIDReducer from './videoID-reducer';

export default combineReducers({
  riffs: riffsReducer,
  riffsMeta: riffsMetaReducer,
  mode: modeReducer,
  googleUser: googleUserReducer,
  riffsPlaying: riffsPlayingReducer,
  viewMutedUserIDs: viewMutedUserIDsReducer,
  name: nameReducer,
  videoID: videoIDReducer
});
