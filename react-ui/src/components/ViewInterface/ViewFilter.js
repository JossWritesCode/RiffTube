import React from 'react';
import YouTubeVideo from '../YouTubeVideo/YouTubeVideo';

class ViewFilter extends React.Component {
  constructor(props) {
    super(props);
    // window.metaPlayhead gets updated by the youtube component
    window.metaPlayHead = React.createRef();
    this.selectDiv = React.createRef();
    window.metaUpdate = (el) => {
      console.log(el.offsetLeft);
      this.selectDiv.current.scrollLeft =
        el.offsetLeft - this.selectDiv.current.offsetWidth / 2;
    };

    this.state = {
      filteredRiffs: [],
      overlappingRiffs: [],
      nonOverlappingRiffs: null,
      selectedRiffs: null,
      tracks: [],
    };
    // filtered riffs is the final result
    // overlapping riffs is a list of sets [of ids] of overlapping riffs
    // selected riffs is a set
    // tracks are used for the UI
  }

  selectRiff = (newRiff) => {
    // use id to find riff in "master" list
    //const riff = this.props.riffs.find( r => r.id == selected_id );
    let riff;
    if (this.state.nonOverlappingRiffs.has(riff)) return;

    const selectedRiffs = new Set(this.state.selectedRiffs);

    const newFiltered = new Set(this.props.riffs);

    const otherOverlaps = new Set(); //new Set( this.state.overlappingRiffs );
    this.state.overlappingRiffs.forEach((el) => otherOverlaps.add(new Set(el)));

    riff = newRiff;

    do {
      // go through each set of overlapping riffs
      for (const set of this.state.overlappingRiffs) {
        // if that set contains the selected riff, remove all its values from the
        if (set.has(riff)) {
          set.forEach((el) => {
            selectedRiffs.delete(el);
            newFiltered.delete(el);
          });
        }
      }

      selectedRiffs.add(riff);

      // now the hard part

      for (const r of selectedRiffs) {
        // find and delete sets of overlap that contain a selected riff
        const toDelete = [];
        for (const set of otherOverlaps) {
          if (set.has(r)) {
            toDelete.push(set);
          }
        }
        for (const set of toDelete) {
          otherOverlaps.delete(set);
          // from the sets in question, remove all their riffs from other overlap sets
          // (because they are no longer valid options)
          var curOverlap = new Set();
          for (const redu of otherOverlaps) {
            for (const tod of set) {
              newFiltered.delete(tod);
              redu.delete(tod);
            }
          }
        }
      }
      for (const redu of otherOverlaps) {
        if (redu.size > 0) curOverlap = new Set([...curOverlap, ...redu]);
      }

      if (curOverlap.size > 0) riff = curOverlap.values().next().value;
    } while (curOverlap.size > 0);

    // generate final filtered list
    const filteredRiffs = [...newFiltered, ...selectedRiffs];

    this.setState({ filteredRiffs, selectedRiffs });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.riffs !== this.props.riffs) {
      debugger;

      // if riffs have changed, we need to recalculate

      // multiple tracks are used to display overlapping riffs at the same time
      const tracks = [[]];
      const trackPos = [0]; // time code where last riff on track ends

      const nonOverlappingRiffs = new Set();

      // used to keep track of conflicting riffs
      const runningRiffs = [];

      // these will overwrite the current values after being built
      const overlappingRiffs = [];
      const selectedRiffs = new Set();

      // slope basically means "was the last action to add or remove from the running list"
      var slope = 0;

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
              // only add set if the prev action was an add,
              // and there is more than 1 riff in the set
              if (slope > 0 && runningRiffs.length > 1) {
                overlappingRiffs.push(new Set(runningRiffs));

                // when adding overlapping set, find if any are in track 0
                // if so, they go into selectedRiffs
                for (const candi of runningRiffs) {
                  if (tracks[0].includes(candi)) {
                    selectedRiffs.add(candi);
                    break;
                  }
                }
              } else if (slope > 0) {
                // 'if' part may be unnecessary
                nonOverlappingRiffs.add(toCheck);
              }

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

      // cleanup after loop
      // check to see if running set has more than 1 riff
      // if so, add it etc.
      if (runningRiffs.length > 1) {
        overlappingRiffs.push(new Set(runningRiffs));

        for (const candi of runningRiffs) {
          if (tracks[0].includes(candi)) {
            selectedRiffs.add(candi);
            break;
          }
        }
      } else nonOverlappingRiffs.add(runningRiffs[0]);

      const filteredRiffs = [...tracks[0]];

      this.setState({
        filteredRiffs,
        overlappingRiffs,
        nonOverlappingRiffs,
        selectedRiffs,
        tracks,
      });
    }
  }

  render() {
    return (
      <React.Fragment>
        <YouTubeVideo id={this.props.id} riffs={this.state.filteredRiffs} />
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
                      backgroundColor: this.state.filteredRiffs.includes(riff)
                        ? 'red'
                        : 'lightgrey',
                    }}
                    onClick={() => this.selectRiff(riff)}
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

export default ViewFilter;
