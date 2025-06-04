import { useNavigate } from "react-router-dom";

export const Deconnexion = ({onClose}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("redirectAfterLogin");
    navigate("/connexion");
  };

  // const handleCancel = () => {
  //   const redirectPath = localStorage.getItem("cancelLogoutRedirect") || "/";
  //   localStorage.removeItem("cancelLogoutRedirect");
  //   navigate(redirectPath);
  // };

  return (
    <>
      <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center justify-center">
        <div
          aria-hidden="true"
          className="fixed inset-0 w-full h-full bg-black bg-opacity-25"
          onClick={onClose}
        ></div>
        <div className="relative z-50 bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Confirmation de déconnexion</h2>
          <p className="text-gray-600 mb-6">
            Êtes-vous sûr de vouloir vous déconnecter ?
          </p>
          <div className="flex justify-around space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 rounded text-white hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

