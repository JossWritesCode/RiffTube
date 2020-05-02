import React from 'react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

// TODO: remove
import { toggleViewUserIdMuted, setViewUserIdMuted } from '../../actions';

class ViewFilter extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { filteredRiffs: [], overlappingRiffs: [], selectedRiffs: {} };
  }

  selectRiff = id =>
  {
  };

  componentDidUpdate( prevProps, prevState )
  {
    console.log( this.state, this.props );

    if ( prevProps.riffs !== this.props.riffs )
    {
        // if riffs have changed, we need to recalculate

        // multiple tracks are used to display overlapping riffs at the same time
        this.tracks = [];
        var trackUse = [];

        // used to keep track of conflicting riffs
        var runningSet = new Set();

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
                for ( const toCheck of runningSet )
                {
                    // (see above)
                    if ( toCheck.time + toCheck.duration <= riff.time )
                    {
                        // only add set if the prev action was an add,
                        // and there is more than 1 riff in the set
                        if ( slope > 0 && runningSet.size > 1 )
                        {
                            this.setState( { overlappingRiffs:
                                [
                                    ...this.state.overlappingRiffs,
                                    // new Set is used to make a copy
                                    new Set(runningSet)
                                ]
                            } );
                        }
                        runningSet.delete( toCheck );
                        slope = -1; // last action was to remove
                    }
                }
            }
            runningSet.add( riff );
            slope = 1; // last action was to add
        }

        // cleanup after loop
        // check to see if any riffs end before this riff starts
        if ( runningSet.size > 1 )
        {
            this.setState( { overlappingRiffs:
                [
                    ...this.state.overlappingRiffs,
                    // new Set is used to make a copy
                    new Set(runningSet)
                ]
            } );
        }
  }

  render() {
    return (
      <React.Fragment>
        <YouTubeVideo id={this.props.videoID} riffs={this.state.filteredRiffs} />
        {
          this.state.names.map(el => (
            <div
              key={el.id}
              onClick={() => this.toggleMute(el.id)}
              style={{
                backgroundColor: this.state.muted[el.id] ? 'gray' : 'blue'
              }}
            >
              {el.name}
            </div>
          ))
        }
     </React.Fragment>
    );
  }
}

export default ViewFilter;
