import { useSongs } from "../context/SongsContext"
import Logo from "../images/Vector.png"
export const AppLogo = () => {
    const {isMobileScreen} = useSongs()
    return (
        <div className="logo-div"
        style={{zIndex: isMobileScreen? "15": "0"}}
        >
            <img src={Logo} alt="spotify" 
            className="logo-img"
            />
        </div>
    )
}