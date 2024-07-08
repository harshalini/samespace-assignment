import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ForYou } from "../pages/ForYou"
import { TopTracks } from "../pages/TopTracks"

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<ForYou/>}/>
                <Route path="/toptracks" element={<TopTracks/>} />
            </Routes>
        </Router>
    )
}