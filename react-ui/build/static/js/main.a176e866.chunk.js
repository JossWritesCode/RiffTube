(this.webpackJsonprifftube=this.webpackJsonprifftube||[]).push([[0],{42:function(e,t,n){e.exports=n(70)},47:function(e,t,n){},70:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(21),i=n.n(o),l=(n(47),n(3)),c=n(7),u=n(5),d=n(4),s=n(6),p=n(2),f=n(17),m=n(11),E=n.n(m),y="EDIT_MODE",v="EDIT_NEW_MODE",b="PLAY_MODE",_="PAUSE_MODE",h=function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(a){a({type:"SET_VIDEO_ID",payload:e}),t&&t.getAuthResponse&&E()({method:"post",url:"".concat(n,"/get-riffs"),data:{token:t.getAuthResponse().id_token,videoID:e}}).then((function(e){a({type:"RECEIVE_RIFF_LIST",payload:e.data})}))}},O=function(e){return{type:"SET_PLAYER_MODE",payload:e}},g=function(e,t,n){var a=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";E()({method:"post",url:"".concat(a,"/load-riff"),responseType:"arraybuffer",data:{token:n?n.getAuthResponse().id_token:null,id:t}}).then((function(n){e({type:"RIFF_LOADED",payload:n.data,id:t})}))},R=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).componentDidMount=function(){if(window.YT&&window.YT.Player)n.loadVideo();else{var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=n.loadVideo;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}},n.loadVideo=function(){var e=n.props.id;window.rifftubePlayer&&window.rifftubePlayer.destroy(),n.player=new window.YT.Player("rifftube-player",{videoId:e,height:390,width:640,playerVars:{playsinline:1},events:{onReady:n.onPlayerReady,onStateChange:n.onPlayerStateChange}}),window.rifftubePlayer=n.player},n.onPlayerReady=function(e){},n.checkForRiffsToLoad=function(e){n.props.riffs.forEach((function(t){"audio"===t.type&&!t.payload&&!t.loading&&t.time>=e&&t.time<e+10&&n.props.loadRiff(t.id,n.props.googleUser)}))},n.onPlayerStateChange=function(e){1===e.data?(n.curRiff=n.props.riffsPlaying,n.riffInterval=setInterval((function(){var e=window.rifftubePlayer.getCurrentTime();n.checkForRiffsToLoad(e),n.props.riffs.forEach((function(t,a){n.curRiff[a]&&(e<t.time||e>t.time+t.duration)&&(n.props.setRiffPlaying(a,!1),n.curRiff[a]=!1,"audio"===t.type&&n.audLock--,n.audLock||(window.rifftubePlayer.setVolume(n.vol?n.vol:100),delete n.vol))}));n.props.riffs.forEach((function(t,a){if(i=a,!n.props.mutedIDs[n.props.riffs[i].user_id]&&!n.curRiff[a]&&e>t.time&&e<t.time+.5&&(n.props.setRiffPlaying(a,!0),n.curRiff[a]=!0,"audio"===t.type)){n.vol||(n.vol=window.rifftubePlayer.getVolume(),window.rifftubePlayer.setVolume(.5*n.vol)),n.audLock?n.audLock++:n.audLock=1;var r=document.createElement("audio");if(r.controls=!1,!t.payload)return;var o=URL.createObjectURL(t.payload);r.src=o,r.play()}var i}))}),100),n.props.mode!==b&&n.props.setPlayerMode(b)):(clearInterval(n.riffInterval),n.props.mode===b&&n.props.setPlayerMode(_))},n.componentDidUpdate=function(e){n.checkForRiffsToLoad(0),n.props.id!==e.id&&n.loadVideo(),n.props.mode!==e.mode&&(n.props.mode!==y&&n.props.mode!==v&&n.props.mode!==_||1!==n.player.getPlayerState()?n.props.mode===b&&1!==n.player.getPlayerState()&&n.player.playVideo():n.player.pauseVideo())},n.render=function(){return r.a.createElement("div",{className:"rifftube-container"},r.a.createElement("div",{id:"rifftube-player"}),Object.keys(n.props.riffsPlaying).filter((function(e){return n.props.riffsPlaying[e]&&"text"===n.props.riffs[e].type})).map((function(e){return r.a.createElement("div",{key:n.props.riffs[e].id},r.a.createElement("div",null,n.props.riffs[e].payload))})))},n}return Object(s.a)(t,e),t}(r.a.Component),I={setPlayerMode:O,setRiffPlaying:function(e,t){return{type:t?"SET_RIFF_PLAYING":"SET_RIFF_NOT_PLAYING",payload:e}},togglePlayerMode:function(e){return{type:"TOGGLE_PLAYER_MODE"}},loadRiff:function(e,t){return function(n){g(n,e,t)}}},D=Object(p.b)((function(e){return{mode:e.mode,riffs:e.riffs.all,riffsPlaying:e.riffsPlaying,googleUser:e.googleUser,mutedIDs:e.viewMutedUserIDs}}),I)(R),P=n(39),j=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(P.GoogleLogin,{socialId:"941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com",className:"google-login",scope:"profile email",fetchBasicProfile:!1,responseHandler:function(t){e.props.setGoogleUser(t,e.props.videoID)},buttonText:"Login With Google"})}}]),t}(r.a.Component),T={setGoogleUser:function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(a){a({type:"GOOGLE_USER_SIGNIN",payload:e}),E()({method:"post",url:"".concat(n,"/get-riffs"),data:{token:e.getAuthResponse().id_token,videoID:t}}).then((function(e){a({type:"RECEIVE_RIFF_LIST",payload:e.data})}))}}},A=Object(p.b)((function(e){return{videoID:e.videoID}}),T)(j);var U={editRiff:function(e,t,n){return function(a){a({type:"EDIT_RIFF",payload:e}),t&&g(a,t,n)}},deleteRiff:function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(a){E()({method:"delete",url:"".concat(n,"/riff-remove/").concat(e),data:{token:t.getAuthResponse().id_token}}).then((function(t){a({type:"DELETE_RIFF",id:e})}))}}},w=Object(p.b)((function(e){return{googleUser:e.googleUser}}),U)((function(e){return r.a.createElement("div",{className:"riff-detail".concat(e.selected?" riff-detail-selected":"")},r.a.createElement("div",null,r.a.createElement("ul",{className:"riff-detail-list"},r.a.createElement("li",null,"start time: ",e.time.toFixed?e.time.toFixed(2):null),r.a.createElement("li",null,"duration: ",e.duration.toFixed(2)),r.a.createElement("li",null,"type: ",e.type),r.a.createElement("li",null,"No. ",e.id)),r.a.createElement("button",{onClick:function(){return e.editRiff(e.index,"audio"!==e.type||e.payload?null:e.id,e.googleUser)}},"Edit"),r.a.createElement("button",{onClick:function(){return e.deleteRiff(e.id,e.googleUser)}},"X")))}));var L=Object(p.b)((function(e){return{riffs:e.riffs.all,riffsPlaying:e.riffsPlaying}}),null)((function(e){return console.log("display",e.riffs),r.a.createElement("div",{className:"list-of-riffs"},e.riffs?e.riffs.sort((function(e,t){return e.time-t.time})).map((function(t,n){return r.a.createElement(w,Object.assign({key:t.id},t,{index:n,selected:!0===e.riffsPlaying[n]}))})):null)})),C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={mediaRecorder:null,recordingState:!1},n}return Object(s.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.mediaDevices&&navigator.mediaDevices.getUserMedia({audio:!0}).then((function(t){var n=new MediaRecorder(t);n.ondataavailable=function(t){e.chunks.push(t.data)},n.onstop=function(t){var n=new Blob(e.chunks,{type:"audio/webm"});e.props.saveTempAudio(n,e.duration)},e.setState({mediaRecorder:n})})).catch((function(e){return console.log("Error",e)}))}},{key:"render",value:function(){var e=this;return navigator.mediaDevices&&this.state.mediaRecorder?this.state.recordingState?r.a.createElement("button",{id:"stopBtn",onClick:function(){e.setState({recordingState:!1}),e.duration=(Date.now()-e.startTime)/1e3,e.state.mediaRecorder.stop()}},"stop"):r.a.createElement("button",{id:"recordBtn",onClick:function(){e.setState({recordingState:!0}),e.chunks=[],e.startTime=Date.now(),e.state.mediaRecorder.start()}},"record"):navigator.mediaDevices&&!this.state.mediaRecorder?r.a.createElement("span",null,"mediaRecorder failed to initialize"):r.a.createElement("span",null,"navigator.mediaDevices not supported. sorry.")}}]),t}(r.a.Component),F=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).durationField=r.a.createRef(),n.htmlPayloadField=r.a.createRef(),n.startTimeField=r.a.createRef(),n}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return console.log("ed rif red"),r.a.createElement("div",{className:"edit-riff"},r.a.createElement("div",{className:"edit-riff-inner"},"audio"===this.props.tempRiff.type?r.a.createElement(r.a.Fragment,null,this.props.mode===y&&this.props.editIndex&&!this.props.tempRiff.payload?r.a.createElement("span",null,"Loading..."):null,r.a.createElement(C,{saveTempAudio:this.props.saveTempAudio}),this.props.tempRiff.payload?r.a.createElement("button",{onClick:function(){var t=document.createElement("audio");t.controls=!1;var n=URL.createObjectURL(e.props.tempRiff.payload);t.src=n,t.play()}},"Play"):null,r.a.createElement("br",null),r.a.createElement("div",null,"Start:"," ",r.a.createElement("input",{id:"riff-start-field",defaultValue:this.props.tempRiff.time,ref:this.startTimeField})),r.a.createElement("button",{disabled:!this.props.tempRiff.payload,onClick:function(){e.props.saveRiff(e.props.googleUser.getAuthResponse().id_token,{payload:e.props.tempRiff.payload,time:Number(e.startTimeField.current.value)},e.props.tempRiff)}},"Save")):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"HTML payload:"),r.a.createElement("textarea",{id:"riff-edit-field",ref:this.htmlPayloadField,defaultValue:this.props.tempRiff.payload}),r.a.createElement("div",null,"Duration:"," ",r.a.createElement("input",{id:"riff-duration-field",defaultValue:this.props.tempRiff.duration||2,ref:this.durationField})),r.a.createElement("div",null,"Start:"," ",r.a.createElement("input",{id:"riff-start-field",defaultValue:this.props.tempRiff.time,ref:this.startTimeField})),r.a.createElement("button",{onClick:function(){e.props.saveRiff(e.props.googleUser.getAuthResponse().id_token,{payload:e.htmlPayloadField.current.value,duration:Number(e.durationField.current.value),time:Number(e.startTimeField.current.value)},e.props.tempRiff)}},"Save")),r.a.createElement("button",{onClick:function(){e.props.cancelEdit()}},"Cancel")))}}]),t}(r.a.Component),S={setPlayerMode:O,saveRiff:function(e,t,n){var a=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(r){r({type:"SAVE_RIFF",payload:t});var o=new FormData;o.append("token",e),o.append("text"===n.type?"text":"blob",t.payload),o.append("type",n.type),o.append("duration","text"===n.type?t.duration:n.duration),o.append("start_time",t.time),o.append("video_id",n.video_id),o.append("tempId",n.tempId),o.append("id",n.id),E()({method:"post",url:"".concat(a,"/save-riff"),data:o,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){r({type:"SAVE_RIFF_SUCCESS",payload:e.data})})).catch((function(e){r({type:"SAVE_RIFF_FAILURE",payload:e.response})}))}},saveTempAudio:function(e,t){return{type:"SAVE_TEMP_AUDIO",payload:e,duration:t}},cancelEdit:function(){return{type:"CANCEL_EDIT"}}},N=Object(p.b)((function(e){return{mode:e.mode,tempRiff:e.riffs.temp,editIndex:e.riffs.editIndex,googleUser:e.googleUser}}),S)(F),V=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("button",{onClick:function(){e.props.createTempRiff(e.props.type,e.props.videoID)}},this.props.type)}}]),t}(r.a.Component),k={createTempRiff:function(e,t){return{type:"audio"===e?"CREATE_TEMP_AUDIO_RIFF":"CREATE_TEMP_TEXT_RIFF",videoID:t}}},M=Object(p.b)((function(e){return{videoID:e.videoID}}),k)(V),B=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={open:!1},n}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("button",{onClick:function(){return e.setState({open:!e.state.open})}},"Collaboration Panel"),this.state.open?r.a.createElement("div",null,"open!"):null)}}]),t}(r.a.Component),x=Object(p.b)((function(e){return{videoID:e.videoID,googleUser:e.googleUser,name:e.name}}),{})(B);var G={setRifferName:function(e,t){var n=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(a){E()({method:"post",url:"".concat(n,"/set-name"),data:{token:t.getAuthResponse().id_token,newName:e}}).then((function(e){a({type:"RECEIVE_NAME_UPDATE",payload:e.data})}))}}},Y=Object(p.b)((function(e){return{mode:e.mode,name:e.name,googleUser:e.googleUser}}),G)((function(e){return r.a.createElement("div",{className:"control-panel"},e.name?r.a.createElement("div",null,"Riffer Name:\xa0",e.name,r.a.createElement("button",{type:"button",onClick:function(){var t=prompt("Enter name",e.name);t&&e.setRifferName(t,e.googleUser)}},"Update Name")):null,r.a.createElement(x,null),r.a.createElement("div",null,r.a.createElement("h2",{className:"add-riff-title"},"Add New Riff"),r.a.createElement(M,{type:"audio"}),r.a.createElement(M,{type:"text"}),e.mode===y||e.mode===v?r.a.createElement(N,null):null),r.a.createElement("h2",{className:"riff-list-title"},"Control Panel"),r.a.createElement(L,null))})),W=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(d.a)(t).call(this,e))).loggedIn=function(){return!!n.props.googleUser&&n.props.googleUser.isSignedIn()},n.authCheck=function(e,t){return n.loggedIn()?r.a.createElement(e,null):r.a.createElement(t,null)},n.extractVideoID=function(e){var t=e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);return t&&11===t[7].length?t[7]:e},n.videoIDRef=r.a.createRef(),n}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"youtube-section"},r.a.createElement("div",{className:"top-section"},r.a.createElement("div",{className:"title-and-url"},r.a.createElement("h1",null,"RiffTube"))),r.a.createElement("form",{onSubmit:function(t){e.props.setVideoID(e.extractVideoID(e.videoIDRef.current.value),e.props.googleUser),t.preventDefault()}},r.a.createElement("label",null,"YouTube URL/ID:\xa0\xa0"),r.a.createElement("input",{type:"text",defaultValue:this.props.videoID,ref:this.videoIDRef}),r.a.createElement("button",{type:"submit"},"Change Video")),r.a.createElement(D,{id:this.props.videoID}),r.a.createElement("div",null,r.a.createElement("a",{href:"/view/"+this.props.videoID,target:"_blank"},"View video"))),r.a.createElement(f.a,{exact:!0,path:"/",render:this.authCheck.bind(this,Y,A)}))}}]),t}(r.a.Component),X={setVideoID:h},q=Object(p.b)((function(e){return{videoID:e.videoID,googleUser:e.googleUser}}),X)(W),z=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(c.a)(t,[{key:"renderNames",value:function(){var e=this,t=[],n=function(e,t){return e.reduce(function(e){return function(t,n){return n.id===e?t||!0:t||!1}}(t),!1)};return this.props.riffs.forEach((function(e){console.log("name",e.name,n(t,e.user_id)),n(t,e.user_id)||t.push({name:e.name,id:e.user_id})})),t.map((function(t){return r.a.createElement("div",{key:t.id,onClick:function(){return e.props.toggleViewUserIdMuted(t.id)},style:{backgroundColor:e.props.mutedIDs[t.id]?"gray":"blue"}},t.name)}))}},{key:"render",value:function(){return r.a.createElement("div",null,this.renderNames())}}]),t}(r.a.Component),H={toggleViewUserIdMuted:function(e){return{type:"TOGGLE_VIEW_USERID_MUTED",id:e}}},J=Object(p.b)((function(e){return{riffs:e.riffs.all,mutedIDs:e.viewMutedUserIDs}}),H)(z),$=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(n=Object(u.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(o)))).componentDidMount=function(){n.props.setVideoID(n.props.match.params.videoID),n.props.getViewRiffs(n.props.match.params.videoID)},n.render=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"View ",n.props.match.params.videoID),r.a.createElement(D,{id:n.props.match.params.videoID}),r.a.createElement(J,null))},n}return Object(s.a)(t,e),t}(r.a.Component),K={setVideoID:h,getViewRiffs:function(e){var t=Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL?Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL:"";return function(n){E()({method:"post",url:"".concat(t,"/get-view-riffs"),data:{videoID:e}}).then((function(e){n({type:"RECEIVE_RIFF_LIST",payload:e.data})}))}}},Q=Object(p.b)(null,K)($),Z=n(24),ee=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(s.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(Z.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"main-section"},r.a.createElement(f.a,{exact:!0,path:"/",component:q}),r.a.createElement(f.a,{path:"/view/:videoID",component:Q}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var te=n(18),ne=n(19),ae=n(16);function re(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function oe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?re(n,!0).forEach((function(t){Object(ae.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):re(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var ie={all:[],temp:null,editIndex:null},le=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ie,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIDEO_ID":return ie;case"CREATE_TEMP_AUDIO_RIFF":case"CREATE_TEMP_TEXT_RIFF":return oe({},e,{temp:oe({},e.temp,{type:"CREATE_TEMP_AUDIO_RIFF"===t.type?"audio":"text",time:window.rifftubePlayer.getCurrentTime(),video_id:t.videoID,tempId:(new Date).getUTCMilliseconds()}),editIndex:null});case"EDIT_RIFF":return oe({},e,{temp:oe({},e.all[t.payload]),editIndex:t.payload});case"DELETE_RIFF":var n=oe({},e);return n.all=n.all.filter((function(e){return e.id!==t.id})),n;case"SAVE_TEMP_AUDIO":return oe({},e,{temp:oe({},e.temp,{duration:t.duration,payload:t.payload})});case"CANCEL_EDIT":return oe({},e,{temp:null,editIndex:null});case"RECEIVE_RIFF_LIST":return oe({},e,{all:[].concat(Object(ne.a)(e.all),Object(ne.a)(t.payload.body.map((function(e){return oe({},e,{time:e.start_time,payload:e.isText?e.text:null,type:e.isText?"text":"audio"})}))))});case"SAVE_RIFF_SUCCESS":if("add"===t.payload.type){var a=Object(ne.a)(e.all);a.forEach((function(e,n,a){e.tempId===t.payload.tempId&&(a[n]=oe({},e,{id:t.payload.id}))}));var r=oe({},e,{all:a});return r}return e;case"SAVE_RIFF":var o,i=oe({},e.temp,{},t.payload);return null===e.editIndex?o=[].concat(Object(ne.a)(e.all),[i]):(o=Object(ne.a)(e.all))[e.editIndex]=i,{all:o,temp:null,editIndex:null};case"LOAD_RIFF":var l=oe({},e);return l.all[t.payload].loading=!0,l;case"RIFF_LOADED":var c=new Blob(new Array(t.payload),{type:"audio/webm"}),u=Object(ne.a)(e.all);u.forEach((function(e){e.id===t.id&&(e.payload=c,e.loading=!1)}));var d=oe({},e,{all:u});return null!==e.editIndex&&e.temp.id===t.id&&(d.temp=oe({},d.temp,{payload:c})),d;default:return e}},ce=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIDEO_ID":return _;case"CREATE_TEMP_AUDIO_RIFF":case"CREATE_TEMP_TEXT_RIFF":case"EDIT_RIFF":return y;case"SET_PLAYER_MODE":return t.payload;case"CANCEL_EDIT":return _;case"TOGGLE_PLAYER_MODE":return e.mode===b?_:b;case"SAVE_RIFF":return b;default:return e}},ue=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GOOGLE_USER_SIGNIN":return t.payload;default:return e}};function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function se(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(n,!0).forEach((function(t){Object(ae.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var pe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIDEO_ID":return{};case"SET_RIFF_PLAYING":case"SET_RIFF_NOT_PLAYING":return se({},e,Object(ae.a)({},t.payload,"SET_RIFF_PLAYING"===t.type));default:return e}};function fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function me(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?fe(n,!0).forEach((function(t){Object(ae.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fe(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ee=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIDEO_ID":return{};case"TOGGLE_VIEW_USERID_MUTED":return me({},e,Object(ae.a)({},t.id,!e[t.id]));default:return e}},ye=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVE_NAME_UPDATE":case"RECEIVE_RIFF_LIST":return t.payload.name||"";default:return e}},ve=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"Oqaz7U37hrE",t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIDEO_ID":return t.payload;default:return e}},be=Object(te.c)({riffs:le,mode:ce,googleUser:ue,riffsPlaying:pe,viewMutedUserIDs:Ee,name:ye,videoID:ve}),_e=n(41),he=Object(te.d)(be,Object(te.a)(_e.a));i.a.render(r.a.createElement(p.a,{store:he},r.a.createElement(ee,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.a176e866.chunk.js.map