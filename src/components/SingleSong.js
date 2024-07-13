import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSongs } from "../context/SongsContext";
import { useExtractColor } from "react-extract-colors";
import { useEffect, useState } from "react";
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export const SingleSong = ({ currId }) => {
  const { songsList, setCurrSong, setImgDominantColor } = useSongs();
  const [currImgUrl, setCurrImgUrl] = useState();

  const getSongById = (sid) => {
    return songsList?.find((s) => s.id === sid);
  };

  const song = getSongById(currId);

  useEffect(() => {
    setCurrImgUrl(`https://cms.samespace.com/assets/${song?.cover}`);
  }, [song?.cover]);

  const { lighterColor } = useExtractColor(currImgUrl);
  useEffect(() => {
    if (song?.cover) {
      setImgDominantColor(lighterColor);
    }
  }, [song?.cover, lighterColor, setImgDominantColor]);

  const handleClickNext = () => {
    console.log("click next");
    setCurrSong((currSong) =>
      currSong < songsList.length - 1 ? currSong + 1 : 0
    );
  };

  const handleEnd = () => {
    console.log("end");
    setCurrSong((currSong) =>
      currSong < songsList.length - 1 ? currSong + 1 : 0
    );
  };
  return (
    <div className="single-song-div">
      <div className="single-song-credits flex">
        <span className="single-song-name">{song?.name}</span>
        <span className="single-song-artist">{song?.artist}</span>
      </div>
      <img
        src={`https://cms.samespace.com/assets/${song?.cover}`}
        alt="song cover"
        className="single-song-img"
      />
      <div>
        <AudioPlayer
          className="single-song-audio-player"
          volume="0.5"
          src={song?.url}
          showSkipControls
          showJumpControls={false}
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          onError={() => {
            console.log("play error");
          }}
          // style={{
          //   background: "none",
          //   border: "none",
          //   color: "white",
          // }}
          customIcons={{
            previous: <FastRewindIcon style={{height: "32px", width: "32px"}}/>,
            next: <FastForwardIcon style={{height: "32px", width: "32px"}}/>,
            loopOff: <MoreHorizIcon/>
          }}
        />
      </div>
    </div>
  );
};
