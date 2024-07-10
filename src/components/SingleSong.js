import SongImage from "../images/image-cover.png"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useSongs } from "../context/SongsContext";

export const SingleSong = ({currId}) => {
    const {songsList, currSong, setCurrSong} = useSongs();
    //const song = songsList.find(s => s.id === id)

    const getSongById = (sid) => {
        return songsList?.find((s) => s.id === sid)
    }

    const song = getSongById(currId)

    const handleClickNext = () => {
        console.log('click next')
          setCurrSong((currSong) =>
              currSong < songsList.length - 1 ? currSong + 1 : 0
          );
      };

      const handleEnd = () => {
        console.log('end')
        setCurrSong((currSong) =>
                currSong < songsList.length - 1 ? currSong + 1 : 0
            );
      }
    return (
        <div className="single-song-div">
            <div>
                {/* <button onClick={() => console.log(song)}>see</button> */}
                <h1>{song?.name}</h1>
                <p>{song?.artist}</p>
            </div>
            <img src={`https://cms.samespace.com/assets/${song?.cover}`} alt="song cover"
            className="single-song-img"
            />
            <div>
            <AudioPlayer
            className="single-song-audio-player"
          volume="0.5"
          src={song?.url}
          showSkipControls
          onClickNext={handleClickNext}
          onEnded={handleEnd}
          onError={()=> {console.log('play error')}}
          style={{
            backgroundColor: 'black',
            color: 'white',
          }}
          // Try other props!
        />
            </div>

        </div>
    )
}