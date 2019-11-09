import React from 'react';

class Record extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state =
        {
            mediaRecorder: null,
            recordingState: false
        };
    }    

    componentDidMount()
    {
        if (navigator.mediaDevices)
        {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(
                stream =>
                {
                    const mr = new MediaRecorder(stream);

                    mr.ondataavailable = e =>
                    {
                        this.chunks.push( e.data );
                    };

                    mr.onstop = e =>
                    {
                        var blob = new Blob( this.chunks, { 'type' : 'audio/webm' }) ; // was 'audio/webm;codecs=opus'
                        var audioURL = URL.createObjectURL(blob);

                        this.props.saveTempAudio( audioURL, this.duration );
                    }
                
                    this.setState( { mediaRecorder: mr } );
                }
            )
            .catch( err =>
                console.log('Error', err)
            );
        }
    }
  
    render()
    {
        var ret; // var for the value to be returned

        if (navigator.mediaDevices && this.state.mediaRecorder)
        {
            if ( !this.state.recordingState )
            {
                ret = (
                    <button
                        id="recordBtn"
                        onClick={ () =>
                            {
                                this.setState( { recordingState: true } );
                                this.chunks = [];
                                this.startTime = Date.now();
                                this.state.mediaRecorder.start();
                            } }
                    >record</button>
                );
            }
            else
            {
                ret = (
                    <button
                        id="recordBtn"
                        onClick={ () =>
                            {
                                this.setState( { recordingState: false } );
                                this.duration = (Date.now() - this.startTime) / 1000;
                                this.state.mediaRecorder.stop();
                            } }
                    >stop</button>
                );
            }
        }
        else if (navigator.mediaDevices && !this.state.mediaRecorder)
            ret = <span>mediaRecorder failed to initialize</span>;
        else
            ret = <span>navigator.mediaDevices not supported. sorry.</span>;

        return ret;
    }
}

export default Record;