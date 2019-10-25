import React, { useState } from 'react';

function Scribe()
{
    const [scribing, setScribing] = useState( false );
  
    var ret; // var for the value to be returned

    if ( !scribing )
    {
        ret = (
            <button
                id="scribeBtn"
                onClick={ () => { setScribing(true); } }
            >scribe</button>
        );
    }
    else
    {
        ret = (
            <div>
                <input
                    id="scribeInput"
                ></input>
                <button
                    id="scribeBtn"
                    onClick={ () => { setScribing(false); } }
                >done</button>
                <button
                    id="scribeBtn"
                    onClick={ () => { setScribing(false); } }
                >cancel</button>
            </div>
        );
    }

    return ret;
}

export default Scribe;