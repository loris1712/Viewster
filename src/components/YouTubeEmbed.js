// YouTubeEmbed.js
import React from 'react';

const YouTubeEmbed = ({ videoLink }) => {
  const getYouTubeID = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoID = getYouTubeID(videoLink);
  const embedUrl = `https://www.youtube.com/embed/${videoID}`;

  return (
    <div className='video-container'>
      {videoID ? (
        <iframe
          src={embedUrl}
          title="YouTube video"
          frameBorder="0"
          allowFullScreen
          style={{ width: '100%', height: '100%' }}
        ></iframe>
      ) : (
        <p>Invalid YouTube link</p>
      )}
    </div>
  );
};

export default YouTubeEmbed;
  