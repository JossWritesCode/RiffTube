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
                        var blob = new Blob( window.chunks, { 'type' : 'audio/webm' }) ; // was 'audio/webm;codecs=opus'
                        var audioURL = URL.createObjectURL(blob);

                        props.saveTempAudio( audioURL );
                    }
                
                    setMediaRecorder( mr );
                }
            )
            .catch( err =>
                console.log('Error', err)
            );
        }
    }, [] );
  
    var ret; // var for the value to be returned

    if (navigator.mediaDevices && mediaRecorder)
    {
        if ( !recordingState )
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
    else if (navigator.mediaDevices && !mediaRecorder)
        ret = <span>mediaRecorder failed to initialize</span>;
    else
        ret = <span>navigator.mediaDevices not supported. sorry.</span>;

    return ret;
}

export default Record;