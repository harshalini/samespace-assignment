import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { useSongs } from "./context/SongsContext";
import { useEffect } from "react";
function App() {
  const { imgDominantColor } = useSongs();
  const rgbToRgba = (rgb, alpha) => {
    const rgbValues = rgb.match(/\d+/g);
    return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, ${alpha})`;
  };

  useEffect(() => {
    if (imgDominantColor) {
      const rgbaColor = rgbToRgba(imgDominantColor, 0.6);
      document.body.style.background = `linear-gradient(108.18deg, ${rgbaColor} 2.46%, rgba(0, 0, 0, 0.6))`;
      document.body.style.backgroundColor = "rgba(0, 0, 0, 1)";
      document.body.style.backgroundSize = "cover";
    }
  }, [imgDominantColor]);

  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;