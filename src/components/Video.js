import React from "react";
import YouTube from "react-youtube";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailIcon,
  EmailShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const Video = ({ video }) => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  return (
    <div>
      <YouTube className="video-youtube" videoId={video?.key} opts={opts} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          gap: 25,
        }}
      >
        <FacebookShareButton
          url={`https://www.youtube.com/watch?v=${video?.key}`}
        >
          <FacebookIcon size={40} round />
        </FacebookShareButton>

        <WhatsappShareButton
          url={`https://www.youtube.com/watch?v=${video?.key}`}
        >
          <WhatsappIcon size={40} round />
        </WhatsappShareButton>

        <EmailShareButton url={`https://www.youtube.com/watch?v=${video?.key}`}>
          <EmailIcon size={40} round />
        </EmailShareButton>

        <TwitterShareButton
          url={`https://www.youtube.com/watch?v=${video?.key}`}
        >
          <TwitterIcon size={40} round />
        </TwitterShareButton>

        <TelegramShareButton
          url={`https://www.youtube.com/watch?v=${video?.key}`}
        >
          <TelegramIcon size={40} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default Video;

// https://www.youtube.com/watch?v=
