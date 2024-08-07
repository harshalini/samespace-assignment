import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSongs } from "../context/SongsContext";
import { useState, useEffect, useRef, useCallback } from "react";

export const SideBar = () => {
  const {
    songsList,
    PlayCurrentSong,
    currSong,
    isSidebarVisible,
    imgDominantColor,
    setIsMobileScreen,
    isMobileScreen,
  } = useSongs();
  const [showSongsList, setShowSongsList] = useState(songsList);
  const [searchText, setSearchText] = useState("");
  const [activeSongTab, setActiveSongTab] = useState("For You");
  const inputRef = useRef();

  const topTracksList = songsList?.filter((s) => s.top_track);

  const SearchSongs = useCallback(
    (searchText) => {
      const searchedSongs = songsList?.filter((s) =>
        s.name.toUpperCase().includes(searchText.toUpperCase())
      );
      setShowSongsList(searchedSongs);
    },
    [songsList]
  );

  useEffect(() => {
    SearchSongs(searchText);
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const screenSizeChange = (e) => setIsMobileScreen(e.matches);

    mediaQuery.addEventListener("change", screenSizeChange);
    setIsMobileScreen(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", screenSizeChange);
  }, [searchText, songsList, SearchSongs, setIsMobileScreen]);

  const forYouTabHandler = () => {
    setActiveSongTab("For You");
    setShowSongsList(songsList);
  };

  const topTracksTabHandler = () => {
    setActiveSongTab("Top Tracks");
    setShowSongsList(topTracksList);
  };

  const searchButtonClickHandler = () => {
    inputRef.current.focus();
  };

  const clearButtonClickHandler = () => {
    inputRef.current.value = "";
    activeSongTab === "For You"
      ? setShowSongsList(songsList)
      : setShowSongsList(topTracksList);
  };

  return (
    <>
      <div
        className={`sidebar-div flex flex-column ${
          isSidebarVisible || !isMobileScreen ? "visible" : "hidden"
        }`}
        style={{
          background: isMobileScreen
            ? `linear-gradient(108.18deg, ${imgDominantColor} 2.46%, black)`
            : "none",
        }}
      >
        <div className="sidebar-nav flex">
          <button
            onClick={forYouTabHandler}
            style={{ opacity: activeSongTab === "For You" ? "1" : "0.5" }}
          >
            For You
          </button>
          <button
            onClick={topTracksTabHandler}
            style={{ opacity: activeSongTab === "Top Tracks" ? "1" : "0.5" }}
          >
            Top Tracks
          </button>
        </div>
        <div className="search-div">
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="search-bar"
            onChange={(e) => setSearchText(e.target.value)}
            ref={inputRef}
          />
          {searchText === "" ? (
            <button
              onClick={searchButtonClickHandler}
              className="search-actions"
            >
              <SearchIcon />
            </button>
          ) : (
            <button
              onClick={clearButtonClickHandler}
              className="search-actions"
            >
              <ClearIcon />
            </button>
          )}
        </div>
        <div className="songs-list-div">
          {showSongsList?.map((s) => (
            <div
              key={s.id}
              className="song-chip flex"
              onClick={() => PlayCurrentSong(s.id)}
              style={{
                cursor: "pointer",
                background:
                  currSong === s.id ? "rgba(255, 255, 255, 0.08)" : "none",
              }}
            >
              <div className="chip-desc flex">
                <img
                  src={`https://cms.samespace.com/assets/${s.cover}`}
                  alt="song-cover"
                  className="chip-cover-img"
                />
                <div className="song-info flex flex-column">
                  <span className="chip-name">{s.name}</span>
                  <span className="chip-artist">{s.artist}</span>
                </div>
              </div>
              <div>
                <p className="chip-duration">{s.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
