import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { useSongs } from "./context/SongsContext";
import { useEffect } from "react";
function App() {
  const { imgDominantColor } = useSongs();

  useEffect(() => {
    // if (imgDominantColor) {
    document.body.style.background = `linear-gradient(108.18deg, ${imgDominantColor} 2.46%, black)`;
    document.body.style.backgroundSize = "cover";
    //   }
    // }, [imgDominantColor]
  });

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
