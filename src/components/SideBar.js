import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSongs } from "../context/SongsContext";
import { useState, useEffect, useRef } from "react";

export const SideBar = () => {
  const { songsList, PlayCurrentSong, currSong } = useSongs();
  const [showSongsList, setShowSongsList] = useState(songsList);
  const [searchText, setSearchText] = useState("");
  const [activeSongTab, setActiveSongTab] = useState("For You");
  const inputRef = useRef();

  useEffect(() => {
    SearchSongs(searchText);
  }, [searchText, songsList]);

  const topTracksList = songsList?.filter((s) => s.top_track);

  const SearchSongs = (searchText) => {
    const searchedSongs = songsList?.filter((s) =>
      s.name.toUpperCase().includes(searchText.toUpperCase())
    );
    setShowSongsList(searchedSongs);
  };

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
    <div className="flex flex-column">
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
          <button onClick={searchButtonClickHandler}>
            <SearchIcon />
          </button>
        ) : (
          <button onClick={clearButtonClickHandler}>
            <ClearIcon />
          </button>
        )}
      </div>
      <div>
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
              {/* <div className="song-chip-cover"> */}
              <img
                src={`https://cms.samespace.com/assets/${s.cover}`}
                alt="song-cover"
                className="chip-cover-img"
              />
              {/* </div> */}
              <div className="song-info flex flex-column">
                <span>{s.name}</span>
                <span className="chip-artist">{s.artist}</span>
              </div>
            </div>
            <div>
              <p>{s.duration}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
