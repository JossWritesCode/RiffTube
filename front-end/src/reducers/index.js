import { combineReducers } from 'redux';

import riffsReducer from './riffs-reducer';
import riffsAudioReducer from './riffsAudio-reducer';
import riffsMetaReducer from './riffsMeta-reducer';
import modeReducer from './mode-reducer';
import googleUserReducer from './googleUser-reducer';
import riffsPlayingReducer from './riffsPlaying-reducer';
import nameReducer from './name-reducer';
import useridReducer from './userid-reducer'
import videoIDReducer from './videoID-reducer';
import videoDurationReducer from './videoDuration-reducer';
import webSocketReducer from './websocket-reducer';

export default combineReducers({
  riffs: riffsReducer,
  riffsAudio: riffsAudioReducer,
  riffsMeta: riffsMetaReducer,
  mode: modeReducer,
  googleUser: googleUserReducer,
  riffsPlaying: riffsPlayingReducer,
  name: nameReducer,
  user_id: useridReducer,
  videoID: videoIDReducer,
  duration: videoDurationReducer,
  websocket: webSocketReducer
});
