(this.webpackJsonprifftube=this.webpackJsonprifftube||[]).push([[0],{42:function(e,t,a){e.exports=a(70)},47:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(19),i=a.n(o),l=(a(47),a(3)),c=a(10),d=a(5),f=a(4),u=a(6),s=a(2),p=a(15),m=a(21),y=a.n(m),E="EDIT_MODE",b="EDIT_NEW_MODE",v="PLAY_MODE",g="PAUSE_MODE",R=function(e){return{type:"SET_PLAYER_MODE",payload:e}},h=function(e,t,a){y()({method:"post",url:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL,"/load-riff"),responseType:"arraybuffer",data:{token:a.getAuthResponse().id_token,id:t}}).then((function(a){e({type:"RIFF_LOADED",payload:a.data,id:t})}))};var O={editRiff:function(e,t,a){return function(n){n({type:"EDIT_RIFF",payload:e}),t&&h(n,t,a)}}},I=Object(s.b)((function(e){return{googleUser:e.googleUser}}),O)((function(e){return r.a.createElement("div",{className:"riff-detail"},r.a.createElement("div",null,r.a.createElement("ul",{className:"riff-detail-list"},r.a.createElement("li",null,"start time: ",e.time.toFixed?e.time.toFixed(2):null),r.a.createElement("li",null,"duration: ",e.duration.toFixed(2)),r.a.createElement("li",null,"type: ",e.type),r.a.createElement("li",null,"No. ",e.id)),r.a.createElement("button",{onClick:function(){return e.editRiff(e.index,"audio"!==e.type||e.payload?null:e.id,e.googleUser)}},"Edit")))}));var _=Object(s.b)((function(e){return{riffs:e.riffs,riffsPlaying:e.riffsPlaying}}),null)((function(e){return console.log("display",e.riffs),r.a.createElement("div",{className:"list-of-riffs"},e.riffs?e.riffs.sort((function(e,t){return e.time-t.time})).map((function(t,a){return r.a.createElement(I,Object.assign({key:t.id},t,{index:a,selected:!0===e.riffsPlaying[a]}))})):null)})),P=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),i=0;i<n;i++)o[i]=arguments[i];return(a=Object(d.a)(this,(e=Object(f.a)(t)).call.apply(e,[this].concat(o)))).componentDidMount=function(){if(window.YT&&window.YT.Player)a.loadVideo();else{var e=document.createElement("script");e.src="https://www.youtube.com/iframe_api",window.onYouTubeIframeAPIReady=a.loadVideo;var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}},a.loadVideo=function(){var e=a.props.id;window.rifftubePlayer&&window.rifftubePlayer.destroy(),a.player=new window.YT.Player("rifftube-player",{videoId:e,height:390,width:640,events:{onReady:a.onPlayerReady,onStateChange:a.onPlayerStateChange}}),window.rifftubePlayer=a.player},a.onPlayerReady=function(e){},a.checkForRiffsToLoad=function(e){a.props.riffs.forEach((function(t){"audio"===t.type&&!t.payload&&!t.loading&&t.time>=e&&t.time<e+10&&a.props.loadRiff(t.id,a.props.googleUser)}))},a.onPlayerStateChange=function(e){1===e.data?(a.curRiff=a.props.riffsPlaying,a.riffInterval=setInterval((function(){var e=window.rifftubePlayer.getCurrentTime();a.checkForRiffsToLoad(e),a.props.riffs.forEach((function(t,n){a.curRiff[n]&&(e<t.time||e>t.time+t.duration)&&(a.props.setRiffPlaying(n,!1),a.curRiff[n]=!1,"audio"===t.type&&window.rifftubePlayer.setVolume(a.vol))})),a.props.riffs.forEach((function(t,n){if(!a.curRiff[n]&&e>t.time&&e<t.time+.5&&(a.props.setRiffPlaying(n,!0),a.curRiff[n]=!0,"audio"===t.type)){a.vol=window.rifftubePlayer.getVolume(),window.rifftubePlayer.setVolume(.5*a.vol);var r=document.createElement("audio");if(r.controls=!1,!t.payload)return;var o=URL.createObjectURL(t.payload);r.src=o,r.play()}}))}),100),a.props.mode===g&&a.props.setPlayerMode(v)):(clearInterval(a.riffInterval),a.props.mode===v&&a.props.setPlayerMode(g))},a.componentDidUpdate=function(e){a.checkForRiffsToLoad(0),a.props.id!==e.id&&a.loadVideo(),a.props.mode!==e.mode&&(a.props.mode!==E&&a.props.mode!==b&&a.props.mode!==g||1!==a.player.getPlayerState()?a.props.mode===v&&1!==a.player.getPlayerState()&&a.player.playVideo():a.player.pauseVideo())},a.render=function(){return r.a.createElement("div",{className:"rifftube-container"},r.a.createElement("div",{id:"rifftube-player"}),Object.keys(a.props.riffsPlaying).filter((function(e){return a.props.riffsPlaying[e]&&"text"===a.props.riffs[e].type})).map((function(e){return r.a.createElement("div",{key:a.props.riffs[e].id},r.a.createElement("div",null,a.props.riffs[e].payload))})))},a}return Object(u.a)(t,e),t}(r.a.Component),D={setPlayerMode:R,setRiffPlaying:function(e,t){return{type:t?"SET_RIFF_PLAYING":"SET_RIFF_NOT_PLAYING",payload:e}},togglePlayerMode:function(e){return{type:"TOGGLE_PLAYER_MODE"}},loadRiff:function(e,t){return function(a){h(a,e,t)}}},j=Object(s.b)((function(e){return{id:e.videoID,mode:e.mode,riffs:e.riffs,riffsPlaying:e.riffsPlaying,googleUser:e.googleUser}}),D)(P),T=a(39),F=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(T.GoogleLogin,{socialId:"941154439836-s6iglcrdckcj6od74kssqsom58j96hd8.apps.googleusercontent.com",className:"google-login",scope:"profile email",fetchBasicProfile:!1,responseHandler:function(t){e.props.setGoogleUser(t,e.props.videoID)},buttonText:"Login With Google"})}}]),t}(r.a.Component),w={setGoogleUser:function(e,t){return function(a){console.log("get url","".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL,"/get-riffs")),a({type:"GOOGLE_USER_SIGNIN",payload:e}),y()({method:"post",url:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL,"/get-riffs"),data:{token:e.getAuthResponse().id_token,videoID:t}}).then((function(e){a({type:"RECEIVE_RIFF_LIST",payload:e.data})}))}}},A=Object(s.b)((function(e){return{videoID:e.videoID}}),w)(F),C=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(f.a)(t).call(this,e))).state={mediaRecorder:null,recordingState:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;navigator.mediaDevices&&navigator.mediaDevices.getUserMedia({audio:!0}).then((function(t){var a=new MediaRecorder(t);a.ondataavailable=function(t){e.chunks.push(t.data)},a.onstop=function(t){var a=new Blob(e.chunks,{type:"audio/webm"});e.props.saveTempAudio(a,e.duration)},e.setState({mediaRecorder:a})})).catch((function(e){return console.log("Error",e)}))}},{key:"render",value:function(){var e=this;return navigator.mediaDevices&&this.state.mediaRecorder?this.state.recordingState?r.a.createElement("button",{id:"stopBtn",onClick:function(){e.setState({recordingState:!1}),e.duration=(Date.now()-e.startTime)/1e3,e.state.mediaRecorder.stop()}},"stop"):r.a.createElement("button",{id:"recordBtn",onClick:function(){e.setState({recordingState:!0}),e.chunks=[],e.startTime=Date.now(),e.state.mediaRecorder.start()}},"record"):navigator.mediaDevices&&!this.state.mediaRecorder?r.a.createElement("span",null,"mediaRecorder failed to initialize"):r.a.createElement("span",null,"navigator.mediaDevices not supported. sorry.")}}]),t}(r.a.Component),S=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(f.a)(t).call(this,e))).durationField=r.a.createRef(),a.htmlPayloadField=r.a.createRef(),a.startTimeField=r.a.createRef(),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return console.log("ed rif red"),r.a.createElement("div",{className:"edit-riff"},r.a.createElement("div",{className:"edit-riff-inner"},"audio"===this.props.tempRiff.type?r.a.createElement(r.a.Fragment,null,this.props.mode!==E||this.props.tempRiff.payload?null:r.a.createElement("span",null,"Loading..."),r.a.createElement(C,{saveTempAudio:this.props.saveTempAudio}),this.props.tempRiff.payload?r.a.createElement("button",{onClick:function(){var t=document.createElement("audio");t.controls=!1;var a=URL.createObjectURL(e.props.tempRiff.payload);t.src=a,t.play()}},"Play"):null,r.a.createElement("br",null),r.a.createElement("div",null,"Start:"," ",r.a.createElement("input",{id:"riff-start-field",defaultValue:this.props.tempRiff.time,ref:this.startTimeField})),r.a.createElement("button",{disabled:!this.props.tempRiff.payload,onClick:function(){e.props.saveRiff(e.props.googleUser.getAuthResponse().id_token,{payload:e.props.tempRiff.payload,time:Number(e.startTimeField.current.value)},e.props.tempRiff)}},"Save")):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,"HTML payload:"),r.a.createElement("textarea",{id:"riff-edit-field",ref:this.htmlPayloadField,defaultValue:this.props.tempRiff.payload}),r.a.createElement("div",null,"Duration:"," ",r.a.createElement("input",{id:"riff-duration-field",defaultValue:this.props.tempRiff.duration||2,ref:this.durationField})),r.a.createElement("div",null,"Start:"," ",r.a.createElement("input",{id:"riff-start-field",defaultValue:this.props.tempRiff.time,ref:this.startTimeField})),r.a.createElement("button",{onClick:function(){e.props.saveRiff(e.props.googleUser.getAuthResponse().id_token,{payload:e.htmlPayloadField.current.value,duration:Number(e.durationField.current.value),time:Number(e.startTimeField.current.value)},e.props.tempRiff)}},"Save")),r.a.createElement("button",{onClick:function(){e.props.cancelEdit()}},"Cancel")))}}]),t}(r.a.Component),U={setPlayerMode:R,saveRiff:function(e,t,a){return function(n){n({type:"SAVE_RIFF",payload:t});var r=new FormData;r.append("token",e),r.append("text"===a.type?"text":"blob",t.payload),r.append("type",a.type),r.append("duration","text"===a.type?t.duration:a.duration),r.append("start_time",t.time),r.append("video_id",a.video_id),r.append("tempId",a.tempId),r.append("id",a.id),y()({method:"post",url:"".concat(Object({NODE_ENV:"production",PUBLIC_URL:""}).REACT_APP_BASE_URL,"/save-riff"),data:r,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){n({type:"SAVE_RIFF_SUCCESS",payload:e.data})})).catch((function(e){n({type:"SAVE_RIFF_FAILURE",payload:e.response})}))}},saveTempAudio:function(e,t){return{type:"SAVE_TEMP_AUDIO",payload:e,duration:t}},cancelEdit:function(){return{type:"CANCEL_EDIT"}}},L=Object(s.b)((function(e){return{mode:e.mode,tempRiff:e.tempRiff,googleUser:e.googleUser}}),U)(S),N=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("button",{onClick:this.props.createTempRiff.bind(null,this.props.type)},this.props.type)}}]),t}(r.a.Component),k={createTempRiff:function(e){return{type:"audio"===e?"CREATE_TEMP_AUDIO_RIFF":"CREATE_TEMP_TEXT_RIFF"}}},V=Object(s.b)(null,k)(N);var x=Object(s.b)((function(e){return{mode:e.mode}}),null)((function(e){return r.a.createElement("div",{className:"control-panel"},r.a.createElement("div",null,r.a.createElement("h2",{className:"add-riff-title"},"Add New Riff"),r.a.createElement(V,{type:"audio"}),r.a.createElement(V,{type:"text"}),e.mode===E||e.mode===b?r.a.createElement(L,null):null),r.a.createElement("h2",{className:"riff-list-title"},"Control Panel"),r.a.createElement(_,null))})),M=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(f.a)(t).call(this,e))).loggedIn=function(){return!!a.props.googleUser&&a.props.googleUser.isSignedIn()},a.authCheck=function(e,t){return a.loggedIn()?r.a.createElement(e,null):r.a.createElement(t,null)},a.extractVideoID=function(e){var t=e.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/);if(t&&11===t[7].length)return t[7];alert("Could not extract video ID.")},a.videoIDRef=r.a.createRef(),a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",null,r.a.createElement("form",{onSubmit:function(t){e.props.setVideoID(e.extractVideoID(e.videoIDRef.current.value)),t.preventDefault()}},r.a.createElement("label",null,"YouTube URL/ID:\xa0\xa0"),r.a.createElement("input",{type:"text",defaultValue:this.props.videoID,ref:this.videoIDRef}),r.a.createElement("button",{type:"button",onClick:function(t){e.props.setVideoID(e.extractVideoID(e.videoIDRef.current.value))}},"Change Video")),r.a.createElement(j,null)),r.a.createElement(p.a,{exact:!0,path:"/",render:this.authCheck.bind(this,x,A)}))}}]),t}(r.a.Component),G={setVideoID:function(e){return{type:"SET_VIDEO_ID",payload:e}}},B=Object(s.b)((function(e){return{videoID:e.videoID,googleUser:e.googleUser}}),G)(M);var Y=function(e){return r.a.createElement("h1",null,"View")},W=a(24),H=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(W.a,null,r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"top-section"},r.a.createElement("div",{className:"title-and-url"},r.a.createElement("h1",null,"RiffTube"))),r.a.createElement("div",{className:"main-section"},r.a.createElement(p.a,{exact:!0,path:"/",component:B}),r.a.createElement(p.a,{path:"/edit",component:Y}))))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=a(16),X=a(22);function q(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function z(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?q(a,!0).forEach((function(t){Object(X.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):q(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var $={videoID:"lYIRO97dhII",googleUser:null,riffs:[],tempRiff:null,mode:g,riffsPlaying:{}},K=a(18),Q=a(41),Z=Object(K.c)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:$,t=arguments.length>1?arguments[1]:void 0;switch(console.log("dispatch",t,e),t.type){case"SET_VIDEO_ID":return{videoID:t.payload,googleUser:e.googleUser,riffs:[],tempRiff:null,mode:g,riffsPlaying:{}};case"GOOGLE_USER_SIGNIN":return z({},e,{googleUser:t.payload});case"CREATE_TEMP_AUDIO_RIFF":case"CREATE_TEMP_TEXT_RIFF":return z({},e,{tempRiff:{type:"CREATE_TEMP_AUDIO_RIFF"===t.type?"audio":"text",time:window.rifftubePlayer.getCurrentTime(),video_id:e.videoID,tempId:(new Date).getUTCMilliseconds()},mode:b});case"EDIT_RIFF":return z({},e,{tempRiff:z({},e.riffs[t.payload]),editIndex:t.payload,mode:E});case"SET_PLAYER_MODE":return z({},e,{mode:t.payload});case"SAVE_TEMP_AUDIO":return z({},e,{tempRiff:z({},e.tempRiff,{duration:t.duration,payload:t.payload})});case"CANCEL_EDIT":return z({},e,{tempRiff:null,editIndex:null,mode:g});case"SET_RIFF_PLAYING":return z({},e,{riffsPlaying:z({},e.riffsPlaying,Object(X.a)({},t.payload,!0))});case"SET_RIFF_NOT_PLAYING":return z({},e,{riffsPlaying:z({},e.riffsPlaying,Object(X.a)({},t.payload,!1))});case"TOGGLE_PLAYER_MODE":return z({},e,{mode:e.mode===v?g:v});case"RECEIVE_RIFF_LIST":return z({},e,{riffs:[].concat(Object(J.a)(e.riffs),Object(J.a)(t.payload.body.map((function(e){return z({},e,{time:e.start_time,payload:e.isText?e.text:null,type:e.isText?"text":"audio"})}))))});case"SAVE_RIFF_SUCCESS":if("add"===t.payload.type){var a=Object(J.a)(e.riffs);a.forEach((function(e,a,n){e.tempId===t.payload.tempId&&(n[a]=z({},e,{id:t.payload.id}))}));var n=z({},e,{riffs:a});return n}return e;case"SAVE_RIFF":var r,o=z({},e.tempRiff,{},t.payload);return e.mode===b?r=[].concat(Object(J.a)(e.riffs),[o]):(r=Object(J.a)(e.riffs))[e.editIndex]=o,z({},e,{riffs:r,tempRiff:null,mode:v});case"LOAD_RIFF":var i=z({},e);return i.riffs[t.payload].loading=!0,i;case"RIFF_LOADED":var l=new Blob(new Array(t.payload),{type:"audio/webm"}),c=Object(J.a)(e.riffs);c.forEach((function(e){e.id===t.id&&(e.payload=l,e.loading=!1)}));var d=z({},e,{riffs:c});return e.mode===E&&e.tempRiff.id===t.id&&(d.tempRiff=z({},d.tempRiff,{payload:l})),d;default:return e}}),Object(K.a)(Q.a));i.a.render(r.a.createElement(s.a,{store:Z},r.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.37137c47.chunk.js.map