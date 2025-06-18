
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/LoadingButton";
import UploadImage from "../../UploadImage/Upload";
import { useUserProfile } from "../../../hooks/useUserProfile";

export const InviteProfil = () => {
  const navigate = useNavigate();

  const {
    user,
    loading,
    error,
    isPhotoUploading,
    photoUploadError,
    updateProfilePhoto,
  } = useUserProfile();

  const handleDisconnect = () => {
    localStorage.removeItem("token");
    navigate("/connexion");
  };

  const handleUploadComplete = async (url) => {
    await updateProfilePhoto(url);
  };

  if (loading) return <Loading />;
  if (error) return <p>Erreur : {error}</p>;
  if (!user) return <p>Utilisateur introuvable</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 mt-12">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden transition-all duration-300 hover:shadow-indigo-500/50 dark:hover:shadow-blue-900/50">
        {/* Photo de profil */}
        <div className="relative h-32">
          <UploadImage
            onUploadComplete={handleUploadComplete}
            initialImage={user.photo || "https://i.pravatar.cc/300"}
          />
        </div>

        {/* Informations utilisateur */}
        <div className="pt-7 pb-6 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {user.nom} {user.prenom}
          </h1>

          <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
            {user.job}
          </p>

          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {user.role === "user" ? "Utilisateur" : "Donateur"}
          </p>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex justify-center space-x-4 mb-6">
          {/* Twitter */}
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253..."></path>
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484..."
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
          {/* Autre */}
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48..."
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>

        {/* Boutons d'action */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 grid text-center space-y-4">
          <span
            onClick={() => navigate("/don")}
            className="py-2 w-full text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
          >
            Faire un don
          </span>
          <span
            onClick={() => navigate("/demandemembre")}
            className="py-2 w-full text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
          >
            Demande membre
          </span>
          <span
            onClick={() => navigate("/editprofile")}
            className="py-2 w-full text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
          >
            Paramètre du compte
          </span>
        </div>

        {/* Bouton de déconnexion */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};
