// src/pages/EspaceDonateur.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importez useNavigate
import { useDonateurData } from "../../hooks/useDonateurData";

// Import des composants de section qui resteront affichés en interne
import { ResumeDonsSection } from "./ResumeDonsSection";
import { HistoriqueDonsSection } from "./HistoriqueDonsSection";

// Icônes (simulées - à remplacer par vos vraies icônes)
const HomeIcon = () => <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>;
const HistoryIcon = () => <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path></svg>;
const GiftIcon = () => <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>;
const SettingsIcon = () => <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 4.09A10.001 10.001 0 0010 2C5.03 2 1 6.03 1 11s4.03 9 9 9 9-4.03 9-9c0-1.488-.387-2.904-1.077-4.09H14.12a2.001 2.001 0 01-1.72-1.01l-.16-.32a2.001 2.001 0 00-2.88 0l-.16.32a2.001 1.01a2.001 0 01-1.72 1.01H4.51zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;


export const EspaceDonateur = () => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("resumeDons");
  const navigate = useNavigate(); // Initialisez useNavigate

  const { userData, loading, error } = useDonateurData();

  if (loading) {
    return (
      <div className="min-h-screen grid justify-center items-center bg-gray-100">
        <p className="text-xl text-gray-700">Chargement de votre espace donateur...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen grid justify-center items-center bg-gray-100">
        <p className="text-xl text-red-600">Erreur : {error}</p>
        <p className="text-md text-gray-600">Veuillez réessayer plus tard ou vous reconnecter.</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen grid justify-center items-center bg-gray-100">
        <p className="text-xl text-gray-700">Aucune donnée utilisateur trouvée pour l'espace donateur.</p>
      </div>
    );
  }

  const dons = userData.dons || [];
  const totalDons = dons.reduce((sum, don) => sum + don.montant, 0);
  const nombreDons = dons.length;

  const handleSidebarClick = (id, path) => {
    if (path) {
      // Si un chemin est défini, naviguer vers cette route
      navigate(path);
    } else {
      // Sinon, changer la section active interne
      setActiveSection(id);
    }
    setOpenSidebar(false); // Ferme la sidebar sur mobile après la sélection
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-50 mt-5 ${
          openSidebar ? "w-64" : "w-20 md:w-64"
        } ${!openSidebar && "hidden md:block"}`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1
            className={`text-xl font-bold text-green-600 transition-opacity duration-300 ${
              openSidebar || window.innerWidth >= 768
                ? "opacity-100"
                : "opacity-0 hidden"
            }`}
          >
            Espace Donateur
          </h1>
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="md:hidden p-2 rounded-full hover:bg-gray-200"
          >
            <MenuIcon />
          </button>
        </div>
        <nav className="py-4">
          <ul className="space-y-2">
            {[
              { id: "resumeDons", label: "Résumé des dons", icon: <HomeIcon /> },
              { id: "historiqueDons", label: "Historique des dons", icon: <HistoryIcon /> },
              // Désormais, ces éléments ont un 'path' pour la redirection
              { id: "faireUnDon", label: "Faire un nouveau don", icon: <GiftIcon />, path: "/don" }, // Redirection vers la page /don
              { id: "parametres", label: "Paramètres", icon: <SettingsIcon />, path: "/profile" }, // Redirection vers la page /profile
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={item.path || "#"} // Utilise le chemin si défini, sinon '#'
                  onClick={(e) => {
                    e.preventDefault(); // Empêche le rechargement de la page
                    handleSidebarClick(item.id, item.path);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                    activeSection === item.id && !item.path ? "bg-gray-100" : "" // Active si c'est une section interne et pas une redirection
                  }`}
                >
                  {item.icon}
                  <span
                    className={`text-gray-700 transition-opacity duration-300 ${
                      openSidebar || window.innerWidth >= 768
                        ? "block"
                        : "hidden"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Espace Donateur</h1>
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Rendu conditionnel des sections internes */}
        {activeSection === "resumeDons" && (
          <ResumeDonsSection totalDons={totalDons} nombreDons={nombreDons} />
        )}
        {activeSection === "historiqueDons" && (
          <HistoriqueDonsSection dons={dons} />
        )}
        {/* Les sections "faireUnDon" et "parametres" ne sont plus rendues ici */}
      </main>
    </div>
  );
};