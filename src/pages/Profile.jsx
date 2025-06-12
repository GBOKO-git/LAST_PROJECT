// src/pages/Profile.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Importez useLocation
import { authService } from "../services/authService";
import { ProfilRestreint } from "./ProfilRestreint"; // Importez le composant ProfilRestreint
import { IoSettingsSharp } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsBank } from "react-icons/bs";

// --- Import des icônes ---

const LogoutIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11.707 3.293a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
const MenuIcon = () => (
  <svg
    className="w-6 h-6 text-gray-700"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    ></path>
  </svg>
);
const AdminIcon = () => (
  <svg
    className="w-5 h-5 text-gray-500"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L9.586 11H3a1 1 0 110-2h6.586L6.293 8.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);
// --- Fin des icônes ---

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("myProfile");
  const navigate = useNavigate();
  const location = useLocation(); // Initialisation de useLocation

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        } else {
          setError(
            "Impossible de charger les données du profil. Veuillez vous reconnecter."
          );
          navigate("/connexion");
        }
      } catch (err) {
        console.error("Erreur lors du chargement du profil:", err);
        setError(
          err.message || "Une erreur est survenue lors du chargement du profil."
        );
        navigate("/connexion");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate("/connexion");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Afficher ProfilRestreint si l'utilisateur n'est pas chargé ou n'est pas validé
  // IMPORTANT : Si user.isAdmin est vrai, cela implique qu'il est "validé" pour le tableau de bord.
  // Cette condition doit donc être plus nuancée : si un admin (même "member" role) est là, on affiche le profil complet
  // Sauf s'il est spécifiquement un 'donor' ou 'invite' qui ne sont pas validés pour le profil 'member' complet.
  // L'AuthGuard gère déjà la redirection initiale. Ici, on se base sur ce que l'AuthGuard a autorisé.
  if (
    !user ||
    // (!user.estValide && user.role === "member" && !user.isAdmin) ||
    user.role === "donor" ||
    user.role === "user"
  ) {
    // Si  l'utilisateur est 'donor' ou 'USER',
    // on affiche le ProfilRestreint.
    return (
      <ProfilRestreint
        user={user}
        loading={loading}
        error={error}
        handleLogout={handleLogout}
      />
    );
  }

  return (
    <div className="bg-gray-100 font-sans min-h-screen flex flex-col md:flex-row mt-14">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-40 ${
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
            Mon Profil
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
              {
                id: "myProfile",
                label: "Mes Informations",
                icon: <FaUserGraduate />,
              },
              {
                id: "myContributions",
                label: "Mes Cotisations",
                icon: <BsBank />,
                path: "/don",
              },
              {
                id: "myProfile",
                label: "Paramètres",
                icon: <IoSettingsSharp />,
                path: "/editprofile",
              },
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={item.path || "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.path) {
                      navigate(item.path);
                    } else {
                      setActiveSection(item.id);
                    }
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                    activeSection === item.id && !item.path ? "bg-gray-100" : ""
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
            {/* Lien vers le Tableau de Bord Administrateur (visible seulement pour les admins) */}
            {user &&
              user.isAdmin && ( // Condition pour afficher le lien
                <li>
                  <a
                    href="/dashboard"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/dashboard");
                      setOpenSidebar(false);
                    }}
                    className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors
                                               ${
                                                 location.pathname ===
                                                 "/dashboard"
                                                   ? "bg-gray-200 text-gray-900"
                                                   : "text-gray-700"
                                               }`}
                  >
                    <AdminIcon />
                    <span
                      className={`transition-opacity duration-300 ${
                        openSidebar || window.innerWidth >= 768
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      Tableau de bord Admin
                    </span>
                  </a>
                </li>
              )}
            {/* Bouton de déconnexion dans la sidebar */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogoutIcon />
                <span
                  className={`transition-opacity duration-300 ${
                    openSidebar || window.innerWidth >= 768 ? "block" : "hidden"
                  }`}
                >
                  Se déconnecter
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-y-auto">
        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-800">Mon Profil</h1>
          <button
            onClick={() => setOpenSidebar(!openSidebar)}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <MenuIcon />
          </button>
        </div>

        {/* Contenu principal du profil */}
        {activeSection === "myProfile" && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Vos Informations Personnelles
                </h1>
              </div>

              <div className="space-y-6">
                {/* Informations personnelles */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Détails du compte
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nom</p>
                      <p className="mt-1 text-lg text-gray-900">{user.nom}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Prénom
                      </p>
                      <p className="mt-1 text-lg text-gray-900">
                        {user.prenom}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Téléphone
                      </p>
                      <p className="mt-1 text-lg text-gray-900">
                        {user?.telephone || "Non renseigné"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Statut du compte */}
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Statut du compte
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Rôle</p>
                      <p className="mt-1 text-lg text-gray-900 capitalize">
                        {user.role}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Statut
                      </p>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          user.estValide
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {user.estValide ? "Validé" : "En attente de validation"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Adresse */}
                {user.adresse && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Adresse
                    </h2>
                    <div className="space-y-2">
                      {user.adresse.rue && (
                        <p className="text-gray-900">{user.adresse.rue}</p>
                      )}
                      <p className="text-gray-900">
                        {[user.adresse.ville, user.adresse.codePostal]
                          .filter(Boolean)
                          .join(" - ")}
                      </p>
                      {user.adresse.pays && (
                        <p className="text-gray-900">{user.adresse.pays}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Historique des cotisations */}
                {user.cotisations && user.cotisations.length >= 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Historique des cotisations
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Montant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Statut
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.cotisations.map((cotisation, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(cotisation.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {cotisation.montant}€
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    cotisation.statut === "payée"
                                      ? "bg-green-100 text-green-800"
                                      : cotisation.statut === "en attente"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {cotisation.statut}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Historique des dons */}
                {user.dons && user.dons.length >= 0 && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Historique des dons
                    </h2>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Montant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {user.dons.map((don, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {new Date(don.date).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {don.montant}€
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-900">
                                {don.description || "-"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
