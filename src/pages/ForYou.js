import { AppLogo } from "../components/AppLogo"
import { SideBar } from "../components/SideBar"
import { SingleSong } from "../components/SingleSong"
import { useSongs } from "../context/SongsContext"
export const ForYou = () => {
    const {currSong} = useSongs()
    return (
        <div>

            <div className="app-layout flex">
                <AppLogo/>
                <div className="app-songs-div flex">
                <SideBar />
                <SingleSong currId={currSong} />
                </div>
            </div>
        </div>
    )
}