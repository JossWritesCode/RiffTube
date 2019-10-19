import React from 'react';

var tag = window.document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = window.document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
player = new YT.Player('player', {
height: '390',
width: '640',
videoId: 'M7lc1UVf-VE',
events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
}
});
}