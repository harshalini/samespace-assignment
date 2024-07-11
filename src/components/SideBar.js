import SearchIcon from "@mui/icons-material/Search";
import { useSongs } from "../context/SongsContext";

export const SideBar = () => {
  const { songsList, PlayCurrentSong, currSong } = useSongs();

  return (
    <div className="flex flex-column">
      <div className="sidebar-nav flex">
        <span>For You</span>
        <span>Top Tracks</span>
      </div>
      <div className="search-div">
        <input
          type="text"
          placeholder="Search Song, Artist"
          className="search-bar"
        />
      </div>
      <div>
        {songsList?.map((s) => (
          <div
            key={s.id}
            className="song-chip flex"
            onClick={() => PlayCurrentSong(s.id)}
            style={{
                cursor: "pointer",
                background: currSong === s.id ? 'rgba(255, 255, 255, 0.08)': 'none'
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
