import React from 'react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

class RiffBar extends React.Component {
    constructor(props) {
        super(props);

        // window.metaPlayhead gets updated by the youtube component
        window.metaPlayHead = React.createRef();
        this.selectDiv = React.createRef();
        window.metaUpdate = (el) => {
        if (this.selectDiv.current)
            // seems like it shouldn't be needed, but here we are
            this.selectDiv.current.scrollLeft =
            el.offsetLeft - this.selectDiv.current.offsetWidth / 2;
        };

        
        this.state = {
            overlappingRiffs: [],
            nonOverlappingRiffs: null,
            tracks: [],
        };
    }
    

    componentDidUpdate(prevProps) {
        if (prevProps.riffs !== this.props.riffs) {

            // multiple tracks are used to display overlapping riffs at the same time
            const tracks = [[]];
            const trackPos = [0]; // time code where last riff on track ends

            // used to keep track of conflicting riffs
            const runningRiffs = [];

            // slope basically means "was the last action to add or remove from the running list"
            var slope = 0;

            console.log("track these", this.props.riffs);

            // sort riffs by starting time
            this.props.riffs.sort((e1, e2) => e1.time - e2.time);

            // loop through sorted riffs
            for (const riff of this.props.riffs) {
                // check to see if any riffs end before this riff starts
                if (runningRiffs.length > 0) {
                    // this could be optimized by first sorting running set
                    const toDelete = [];
                    for (const toCheck of runningRiffs) {
                    // (see above)
                        if (toCheck.time + toCheck.duration <= riff.time) {

                            // don't delete in place while looping
                            toDelete.push(toCheck);
                            slope = -1; // last action was to remove
                        }
                    }
                    for (const el of toDelete)
                        runningRiffs.splice(runningRiffs.indexOf(el), 1);
                }

                // add this riff to running list
                runningRiffs.push(riff);

                // keep running list sorted by first ending
                runningRiffs.sort(
                    (e1, e2) => e1.time + e1.duration - (e2.time + e2.duration)
                );

                // last action was to add
                slope = 1;

                // assign riff to a track
                var flag = true;
                for (var i = 0; i < tracks.length; i++) {
                    // check whether this track is available
                    if (trackPos[i] <= riff.time) {
                        tracks[i].push(riff);
                        trackPos[i] = riff.time + riff.duration;
                        flag = false;
                        break;
                    }
                }

                // if no track was found, add one
                if (flag) {
                    tracks.push([riff]);
                    trackPos.push(riff.time + riff.duration);
                }
            }

            console.log("set state riffs", tracks)
            this.setState(() => ({
                tracks,
            }));
        }
    }


  render() {
    console.log("show", this.state.test, this.state.tracks);
    return (
      <React.Fragment>
        <YouTubeVideo id={this.props.id} riffs={this.props.riffs} />
        <div
          ref={this.selectDiv}
          style={{ fontSize: '2em', overflow: 'hidden', width: '640px' }}
        >
          <div
            style={{
              height: `${this.state.tracks.length * 0.75}em`,
              width: `${this.props.duration}em`,
              position: 'relative',
            }}
          >
            <div
              id="meta-play-head"
              style={{ backgroundColor: 'red', height: 'inherit' }}
              ref={window.metaPlayHead}
            />
            {this.state.tracks.map((trackArray) => (
              <div
                style={{ width: `${this.props.duration}em`, height: '0.75em' }}
              >
                {trackArray.map((riff) => (
                  <div
                    style={{
                      position: 'absolute',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      fontSize: '0.25em',
                      lineHeight: '3em',
                      verticalAlign: 'middle',
                      left: `${riff.time * 4}em`,
                      height: '3em',
                      width: `${riff.duration * 4}em`,
                      backgroundColor: 'red',
                    }}
                  >
                    {riff.name}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RiffBar;
