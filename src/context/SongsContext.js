import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const songsContext = createContext();

const SongsProvider = ({ children }) => {
  const [songsList, setSongsList] = useState();
  const [currSong, setCurrSong] = useState();
  const [imgDominantColor, setImgDominantColor] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

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

  const ToggleSidebarVisible = (() => setIsSidebarVisible(!isSidebarVisible))
  
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
        isSidebarVisible,
        setIsSidebarVisible,
        ToggleSidebarVisible
      }}
    >
      {children}
    </songsContext.Provider>
  );
};

const useSongs = () => useContext(songsContext);

export { useSongs, SongsProvider };
