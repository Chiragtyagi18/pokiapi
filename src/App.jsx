
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Detail from "./pages/Detail";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/pokemon/:pokemonId" element={<Detail />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
