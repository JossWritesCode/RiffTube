import { combineReducers } from 'redux';

import riffsReducer from './riffs-reducer';
import riffsAudioReducer from './riffsAudio-reducer';
import riffsMetaReducer from './riffsMeta-reducer';
import modeReducer from './mode-reducer';
import googleUserReducer from './googleUser-reducer';
import riffsPlayingReducer from './riffsPlaying-reducer';
import nameReducer from './name-reducer';
import useridReducer from './userid-reducer';
import videoIDReducer from './videoID-reducer';
import videoDurationReducer from './videoDuration-reducer';
import webSocketReducer from './websocket-reducer';
import userDataReducer from './userData-reducer';
import publicProfileDataReducer from './publicProfileData-reducer';
import publicProfileNameReducer from './publicProfileName-reducer';
import globalVideoListReducer from './globalVideoList-reducer';
import immediateRecordReducer from './immediate-record-reducer';
import recorderReducer from './recorder-reducer';

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
  websocket: webSocketReducer,
  userData: userDataReducer,
  publicProfileData: publicProfileDataReducer,
  publicProfileName: publicProfileNameReducer,
  globalVideoList: globalVideoListReducer,
  immediateRecord: immediateRecordReducer,
  recorder: recorderReducer,
});
