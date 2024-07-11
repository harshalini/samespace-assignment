import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSongs } from "../context/SongsContext";
import { useExtractColor } from "react-extract-colors";
import { useEffect, useState } from "react";

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
      <div>
        <h1>{song?.name}</h1>
        <p>{song?.artist}</p>
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
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          onError={() => {
            console.log("play error");
          }}
          style={{
            backgroundColor: "black",
            color: "white",
          }}
        />
      </div>
    </div>
  );
};
