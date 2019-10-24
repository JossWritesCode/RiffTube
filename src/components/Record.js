import React, { useState, useEffect } from 'react';

function Record(props)
{
    const [mediaRecorder, setMediaRecorder] = useState( null );
    const [recordingState, setRecordingState] = useState( false );

    useEffect( () =>
    {
        if (navigator.mediaDevices)
        {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(
                stream =>
                {
                    const mr = new MediaRecorder(stream);

                    mr.ondataavailable = e =>
                    {
                        window.chunks.push( e.data );
                    };

                    mr.onstop = e =>
                    {
                        var blob = new Blob( window.chunks, { 'type' : 'audio/webm;codecs=opus' }) ;
                        var audioURL = URL.createObjectURL(blob);

                        var audio = document.createElement('audio');
                        audio.controls = false;
                        audio.src = audioURL;
                        audio.play();
                    }
                
                    setMediaRecorder( mr );
                }
            );
        }
    }, [] );
  
    var ret;

    if (navigator.mediaDevices &&  mediaRecorder)
    {
        if (!recordingState )
        {
            ret = (
                <button
                    id="recordBtn"
                    onClick={ () => { setRecordingState(true); window.chunks = []; mediaRecorder.start(); } }
                >record</button>
            );
        }
        else
        {
            ret = (
                <button
                    id="recordBtn"
                    onClick={ () => { setRecordingState(false); mediaRecorder.stop(); } }
                >stop</button>
            );
        }
    }
    else
        ret = <span>navigator.mediaDevices not supported. sorry.</span>;

    return ret;
}

export default Record;