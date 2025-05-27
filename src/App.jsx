import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./composants/navbar/Navbar";
import { Profil } from "./pages/Profile";
import { Evenement } from "./pages/Evenement";
import { Accueil } from "./pages/Accueil";
import { Don } from "./pages/Don";
import { Membre } from "./pages/Membre";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/don" element={<Don />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/membre" element={<Membre />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
