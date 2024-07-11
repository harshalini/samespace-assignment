import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { useSongs } from "./context/SongsContext";
function App() {
  const { imgDominantColor } = useSongs();
  return (
    <div
      className="App"
      style={{
        background: `linear-gradient(108.18deg, ${imgDominantColor} 2.46%, rgba(0, 0, 0, 0.6) 99.84%)`,
      }}
    >
      <AppRouter />
    </div>
  );
}

export default App;
