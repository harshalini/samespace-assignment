import { AppLogo } from "../components/AppLogo";
import { SideBar } from "../components/SideBar";
import { SingleSong } from "../components/SingleSong";
import { useSongs } from "../context/SongsContext";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";

export const ForYou = () => {
  const { currSong, ToggleSidebarVisible, isSidebarVisible } = useSongs();
  return (
    <div className="app-layout flex">
      <button className="menu-btn" onClick={ToggleSidebarVisible}>
        {isSidebarVisible ? (
          <ClearIcon className="sidebar-action" />
        ) : (
          <MenuIcon className="sidebar-action" />
        )}
      </button>
      <AppLogo />
      <div className="app-songs-div flex">
        <SideBar />
        <SingleSong currId={currSong} />
      </div>
    </div>
  );
};
