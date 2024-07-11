import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const songsContext = createContext();

const SongsProvider = ({ children }) => {
  const [songsList, setSongsList] = useState();
  const [currSong, setCurrSong] = useState();
  const [imgDominantColor, setImgDominantColor] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = axios.get("https://cms.samespace.com/items/songs");
        setSongsList((await res).data.data);
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  const PlayCurrentSong = (id) => {
    setCurrSong(id);
  };
  return (
    <songsContext.Provider
      value={{
        songsList,
        setSongsList,
        currSong,
        setCurrSong,
        PlayCurrentSong,
        imgDominantColor,
        setImgDominantColor,
      }}
    >
      {children}
    </songsContext.Provider>
  );
};

const useSongs = () => useContext(songsContext);

export { useSongs, SongsProvider };
