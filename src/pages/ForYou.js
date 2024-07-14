import { AppLogo } from "../components/AppLogo";
import { SideBar } from "../components/SideBar";
import { SingleSong } from "../components/SingleSong";
import { useSongs } from "../context/SongsContext";
import MenuIcon from "@mui/icons-material/Menu";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import loader from "../components/images/loader.svg";

export const ForYou = () => {
  const { currSong, ToggleSidebarVisible, isSidebarVisible } = useSongs();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500); // 1 second delay

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

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
        {isLoaded ? (
          <SideBar />
        ) : (
          <div className="loader-class">
            <img src={loader} alt="Loading..." className="loading-image" />
          </div>
        )}
        <SingleSong currId={currSong} />
      </div>
    </div>
  );
};
