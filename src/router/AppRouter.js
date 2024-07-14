import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ForYou } from "../pages/ForYou";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ForYou />} />
      </Routes>
    </Router>
  );
};
