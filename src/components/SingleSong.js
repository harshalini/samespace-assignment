import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSongs } from "../context/SongsContext";
import { useExtractColor } from "react-extract-colors";
import { useEffect, useState } from "react";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const SingleSong = ({ currId }) => {
  const { songsList, currSong, setCurrSong, setImgDominantColor } = useSongs();
  const [currImgUrl, setCurrImgUrl] = useState();

  const getSongById = (sid) => {
    return songsList?.find((s) => s.id === sid);
  };

  const song = getSongById(currId);
  const currIndex = songsList?.findIndex((song) => song.id === currSong);

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
    const nextIndex = currIndex < songsList.length - 1 ? currIndex + 1 : 0;
    setCurrSong(songsList[nextIndex].id);
  };

  const handleClickPrevious = () => {
    const prevIndex = currIndex > 0 ? currIndex - 1 : songsList.length - 1;
    setCurrSong(songsList[prevIndex].id);
  };
  return (
    <div className="single-song-div">
      {currSong < 1 ? (
        <p
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "white",
            marginTop: "3rem",
          }}
        >
          Hey, Play Some Music!
        </p>
      ) : (
        <div>
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
              autoPlay
              autoPlayAfterSrcChange
              showSkipControls
              showJumpControls={false}
              onClickPrevious={handleClickPrevious}
              onClickNext={handleClickNext}
              onEnded={handleClickNext}
              onError={() => {
                console.log("play error");
              }}
              customIcons={{
                previous: (
                  <FastRewindIcon style={{ height: "32px", width: "32px" }} />
                ),
                next: (
                  <FastForwardIcon style={{ height: "32px", width: "32px" }} />
                ),
                loopOff: <MoreHorizIcon />,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
