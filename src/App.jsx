import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./composants/navbar/Navbar";
import { Profile } from "./pages/Profile";
import { Evenement } from "./pages/Evenement";
import { Accueil } from "./pages/Accueil";
import { Don } from "./pages/Don";
import { Membre } from "./pages/Membre";
import { Connexion } from "./pages/Connexion";
import { Inscription } from "./pages/Inscription";
import { ProfilRestreint } from "./pages/ProfilRestreint";

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <>
      <Router {...routerConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/don" element={<Don />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/membre" element={<Membre />} />
          <Route path="/profilRestreint" element={<ProfilRestreint />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
