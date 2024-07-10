import { useEffect } from "react";
import image_cover from "../images/image-cover.png"
import SearchIcon from '@mui/icons-material/Search';
import { useSongs } from "../context/SongsContext";

export const SideBar = () => {
    const {songsList, PlayCurrentSong} = useSongs();
    const songsArray = [
        {
            id: 1,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 2,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 3,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 4,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 5,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 6,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 7,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 8,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
        {
            id: 9,
            name: "Starboy",
            artist: "The Weeknd",
            duration: "4:16",
            cover: image_cover
        },
    ]
    return (
        <div className="flex flex-column">
            <div className="sidebar-nav flex">
                <span>For You</span>
                <span>Top Tracks</span>
            </div>
            <div className="search-div">
                <input type="text" 
                placeholder="Search Song, Artist"
                className="search-bar"
                />
            </div>
            <div>
                {songsList?.map((s) => (
                    <div key={s.id} className="song-chip flex" onClick={() => PlayCurrentSong(s.id)}>
                        <div className="chip-desc flex">
                            {/* <div className="song-chip-cover"> */}
                                <img src={`https://cms.samespace.com/assets/${s.cover}`} alt="song-cover" className="chip-cover-img"/>
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
    )
}