

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
// Importation de 'useNavigate' de react-router-dom pour la navigation
import { useNavigate } from "react-router-dom";

// Assurez-vous que le chemin vers useAuthCard est correct pour votre projet React
// import { useAuthGuard } from "../../../hooks/useAuthCard"; 

// Importez vos composants de contenu.
// Assurez-vous que ces chemins sont corrects pour votre structure de dossier.
import MonProfile from "../../SideContent/MonProfile/MonProfile";
import MonCursus from "../../SideContent/MonCursus/MonCursus";
import { MaCotisation } from "../../SideContent/MaCotisation/MaCotisation";
import { MesProjets } from "../../SideContent/MesProjets/MesProjets";
import { Deconnexion } from "../../SideContent/Déconnexion/Deconnexion";
// Si ValidateMembers et MesEvenements ne sont pas importés, vous devrez les importer ou les retirer du switch.
// import ValidateMembers from "../../SideContent/ValidateMembers/ValidateMembers"; // Exemple d'importation
// import MesEvenements from "../../SideContent/MesEvenements/MesEvenements"; // Exemple d'importation

// Vous devrez créer ce composant Sidebar ou l'importer si vous l'avez déjà.
// Je vais fournir un exemple basique de Sidebar ci-dessous.
import { Sidebar } from "../Sidebar/Sidebar"; // Assurez-vous que ce chemin est correct

export const MemberProfil = () => {
  const [activeComp, setActiveComp] = useState("Profil"); // J'ai changé "Profile" en "Profil" pour correspondre à votre switch
  const [isOpen, setIsOpen] = useState(false);

  // Remplacer 'useRoutes' (qui est plus pour la configuration de routes) par 'useNavigate' pour la navigation impérative
  const navigate = useNavigate(); 

  // Assurez-vous que useAuthGuard est compatible avec React et ne dépend pas de Next.js
  // useAuthGuard();

  useEffect(() => {
    // Si vous souhaitez naviguer vers une route comme '/dashboard' via react-router-dom,
    // utilisez 'navigate' au lieu de 'router.push'.
    // Si 'dashboard' est juste un état pour afficher un composant interne, vous pouvez laisser tel quel.
    if (activeComp === "dashboard") {
      navigate("/dashboard"); 
    }
  }, [activeComp, navigate]); // Ajoutez 'navigate' aux dépendances de useEffect

  const sidebarContent = () => {
    switch (activeComp) {
      case "Profil":
        return <MonProfile />;

      // case "Validation":
      //   return <ValidateMembers />;

      case "Cursus":
        return <MonCursus />;

      case "Cotisation":
        return <MaCotisation />;

      case "Projets":
        return <MesProjets />;

      // case "Evènement":
      //   return <MesEvenements />;

      case "Déconnexion":
        return <Deconnexion />;

      default:
        return <MonProfile />;
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row mt-2 md:mt-16 min-h-screen ">
      {/* Menu hamburger mobile */}
      <div className="md:hidden grid p-4 justify-between items-center bg-slate-400 shadow-md">
        <button
          className="fixed focus:outline-none size-10 dark:text-white top-16 z-50 text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 " /> : <Menu className="w-6 h-6 " />}
        </button>
      </div>

      {/* Sidebar Mobile */}
      {isOpen && (
        <div className="md:hidden fixed h-full z-40 mt-7">
          {/* Assurez-vous que Sidebar prend ces props ou adaptez-le */}
          <Sidebar setActiveComp={setActiveComp} activeComp={activeComp} />
        </div>
      )}

      <div className="hidden md:block">
        {/* Assurez-vous que Sidebar prend ces props ou adaptez-le */}
        <Sidebar setActiveComp={setActiveComp} activeComp={activeComp} />
      </div>
      <main className="grid justify-center md:items-center w-full overflow-x-hidden">
        {sidebarContent()}
      </main>
    </div>
  );
};
