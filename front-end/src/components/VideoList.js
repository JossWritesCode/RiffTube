import React from 'react';
import { Link } from 'react-router-dom';

function VideoList({ userData }) {
  return (
    <ul className="my-videos-list">
      {userData
        ? userData.map(({ url, title, count }) => (
            <Link to={`/riff/${url}`}>
              <li className="my-video">
                <h3 className="my-video-title">
                  {title.length > 45 ? title.slice(0, 45) + '...' : title}
                  &nbsp; ({count} riff{count === 1 ? '' : 's'})
                </h3>
                <img
                  alt="video frame"
                  src={`https://img.youtube.com/vi/${url}/0.jpg`}
                />
              </li>
            </Link>
          ))
        : null}
    </ul>
  );
}

export default VideoList;
