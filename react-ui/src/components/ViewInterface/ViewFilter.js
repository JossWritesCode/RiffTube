import React from 'react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

class ViewFilter extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { filteredRiffs: [], overlappingRiffs: [], selectedRiffs: null, tracks: [] };
    // filtered riffs is the final result
    // overlapping riffs is a list of sets [of ids] of overlapping riffs
    // selected riffs is a set
    // tracks are used for the UI
  }

  selectRiff = selected_id =>
  {
    /*
    const selectedRiffs = this.state.selectedRiffs.map(
        id =>
        {
          const set = this.state.overlappingRiffs[ i ];
          return set.has( selected_id ) ? selected_id : id;
        } );
    this.setState( { selectedRiffs } );
    */
  }

  componentDidUpdate( prevProps, prevState )
  {
    debugger;
    if ( prevProps.riffs !== this.props.riffs )
    {
      // if riffs have changed, we need to recalculate

      // multiple tracks are used to display overlapping riffs at the same time
      const tracks = [ [] ];
      const trackPos = [ 0 ]; // time code where last riff on track ends

      // used to keep track of conflicting riffs
      const runningSet = new Set();

      // these will overwrite the current values after being built
      const overlappingRiffs = [];
      const selectedRiffs = new Set();

      // map from riff to their overlap sets
      const lapMap = new Map();

      // slope basically means "was the last action to add or remove from the runningSet"
      var slope = 0;
      
      // sort riffs by starting time
      this.props.riffs.sort( (e1,e2) => (e1.time - e2.time) );
      
      // loop through sorted riffs
      for ( const riff of this.props.riffs )
      {
        // check to see if any riffs end before this riff starts
        if ( runningSet.size > 0 )
        {
          // this could be optimized by first sorting running set
          const toDelete = [];
          for ( const toCheck of runningSet )
          {
            // (see above)
            if ( toCheck.time + toCheck.duration <= riff.time )
            {
                // only add set if the prev action was an add,
                // and there is more than 1 riff in the set
                if ( slope > 0 && runningSet.size > 1 )
                    overlappingRiffs.push( new Set( runningSet ) );
                // don't delete in place while looping
                toDelete.push( toCheck );
                slope = -1; // last action was to remove
            }
          }
          for ( const el in toDelete )
            runningSet.delete( el );

          if ( runningSet.size > 0 && trackPos[0] < riff.time )
            selectedRiffs.add( riff );
        }
        
        // add this riff to running set
        runningSet.add( riff );

        // assign riff to a track
        var flag = true;
        for ( var i = 0; i < tracks.length; i++ )
        {
          // check whether this track is available
          if ( trackPos[ i ] <= riff.time )
          {
            tracks[ i ].push( riff );
            trackPos[ i ] = riff.time + riff.duration;
            flag = false;
            break;
          }
        }
        // if no track was found, add one
        if ( flag )
        {
          tracks.push( [ riff ] );
          trackPos.push( riff.time + riff.duration );
        }

        // last action was to add
        slope = 1;
      }

      // cleanup after loop
      // check to see if any riffs end before this riff starts
      if ( runningSet.size > 1 )
        overlappingRiffs.push( new Set( runningSet ) );

      const filteredRiffs = [ ...tracks[0] ];

      this.setState( { filteredRiffs, overlappingRiffs, selectedRiffs, tracks } );
    }
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.filteredRiffs.map(
            el =>
            <div>
              {el.time}
            </div>
          )
        }
     </React.Fragment>
    );
  }
}

export default ViewFilter;
