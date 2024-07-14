import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const songsContext = createContext();

const SongsProvider = ({ children }) => {
  const [songsList, setSongsList] = useState();
  const [currSong, setCurrSong] = useState(null);
  const [imgDominantColor, setImgDominantColor] = useState();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(
    window.matchMedia("(max-width: 900px)").matches
  );

  useEffect(() => {
    (async () => {
      try {
        const res = axios.get("https://cms.samespace.com/items/songs");
        //setSongsList((await res).data.data);
        const songs = (await res).data.data;

        const completeSongsList = [...songs];
        const audio = new Audio();

        const loadMetadata = (index) => {
          if (index >= completeSongsList.length) {
            setSongsList(completeSongsList);
          }
          const song = completeSongsList[index];
          audio.src = song?.url;

          audio.addEventListener("loadedmetadata", function onLoadedMetadata() {
            const duration = formatDuration(audio.duration);
            completeSongsList[index].duration = duration;
            audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            loadMetadata(index + 1);
          });
        };

        loadMetadata(0);
        setSongsList(completeSongsList);
      } catch (e) {
        throw e;
      }
    })();
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const PlayCurrentSong = (id) => {
    setCurrSong(id);
  };

  const ToggleSidebarVisible = () => setIsSidebarVisible(!isSidebarVisible);

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
        ToggleSidebarVisible,
        isMobileScreen,
        setIsMobileScreen,
      }}
    >
      {children}
    </songsContext.Provider>
  );
};

const useSongs = () => useContext(songsContext);

export { useSongs, SongsProvider };
