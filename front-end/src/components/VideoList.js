import React from 'react';
import { Link } from 'react-router-dom';

function VideoList({ userData }) {
  return (
    <ul className="my-videos-list">
      {userData
        ? userData.map(({ url, title, count }) => (
            <li className="my-video">
                <h3 className="my-video-title">
                    {title.length > 40 ? title.slice(0, 40) + '...' : title}
                    &nbsp; ({count} riff{count == 1 ? '' : 's'})
                    <br />
                    <Link to={`/riff/${url}`}>Riff</Link>
                    &nbsp;/&nbsp;
                    <Link to={`/view/${url}`}>View</Link>
                </h3>
                <Link to={`/riff/${url}`}>
                    <img
                    alt="video frame"
                    src={`https://img.youtube.com/vi/${url}/0.jpg`}
                    />
                </Link>
            </li>
          ))
        : null}
    </ul>
  );
}

export default VideoList;
