// // src/components/Membership/MembershipRequestPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loading from "../composants/Loading/LoadingButton";
// import { authService } from "../services/authService";
// import { membershipService } from "../services/membershipService";
// // Importer un service pour gérer les demandes de membres

// export const MembershipRequestPage = () => {
//   const [user, setUser] = useState(null);
//   const [formData, setFormData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     message: "", // Champ pour un message ou des motivations
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       // Assurez-vous que membershipService a une méthode submitRequest
//       await membershipService.submitRequest(formData);
//       setSuccess("Votre demande d'adhésion a été soumise avec succès !");
//       setFormData({ nom: "", prenom: "", email: "", message: "" }); // Réinitialiser le formulaire
//       // Optionnel: rediriger après un certain temps
//       // setTimeout(() => navigate('/confirmation-demande'), 3000);
//     } catch (err) {
//       setError(err.message || "Erreur lors de l'envoi de votre demande.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await authService.getCurrentUser();
//         if (response) {
//         setUser(response);
//             setFormData((prev) => ({
//             ...prev,
//             nom: user.nom || "",
//             prenom: user.prenom || "",
//             email: user.email || "",
//         }))
//         }

//       } catch (error) {
//         console.error("erreur de chargement ", error);
//       }
//     };
//     getUser();
//   }, []);

//   if (loading) return <Loading />;
//   return (
//     <div className="bg-gray-300/60 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 transition-all duration-300">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
//           Demande d'Adhésion
//         </h2>

//         {success && (
//           <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
//             {success}
//           </p>
//         )}
//         {error && (
//           <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
//             {error}
//           </p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="nom"
//               className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
//             >
//               Nom:
//             </label>
//             <input
//               type="text"
//               id="nom"
//               name="nom"
//               value={formData.nom}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="prenom"
//               className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
//             >
//               Prénom:
//             </label>
//             <input
//               type="text"
//               id="prenom"
//               name="prenom"
//               value={formData.prenom}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
//             >
//               Email:
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="message"
//               className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
//             >
//               Votre message/motivations:
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
//             ></textarea>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
//               disabled={loading}
//             >
//               {loading ? <Loading /> : "Envoyer la Demande"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// src/components/Membership/MembershipRequestPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../composants/Loading/LoadingButton"; // Assurez-vous que ce chemin est correct
import { authService } from "../services/authService"; // Assurez-vous que ce chemin est correct
import { membershipService } from "../services/membershipService"; // <--- DÉCOMMENTÉ ET ESSENTIEL : Assurez-vous que ce chemin est correct

export const MembershipRequestPage = () => {
  const [user, setUser] = useState(null); // L'état pour stocker les infos de l'utilisateur connecté
  const [formData, setFormData] = useState({
    nom: "", // Initialisé à vide, sera rempli par useEffect
    prenom: "", // Initialisé à vide, sera rempli par useEffect
    email: "", // Initialisé à vide, sera rempli par useEffect
    role: "",
    message: "", // Champ pour le message de l'utilisateur
  });
  const [loading, setLoading] = useState(true); // Initialisé à true car on charge l'utilisateur au départ
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // --- Hook useEffect pour charger les données de l'utilisateur au montage du composant ---
  useEffect(() => {
    const getUserAndSetFormData = async () => {
      try {
        const userData = await authService.getCurrentUser(); // Récupère les infos de l'utilisateur
        if (userData) {
          setUser(userData); // Met à jour l'état 'user'
          // Met à jour 'formData' avec les données de l'utilisateur
          setFormData((prevData) => ({
            ...prevData,
            nom: userData.nom || "",
            prenom: userData.prenom || "",
            email: userData.email || "",
          }));
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement des données utilisateur: ",
          err
        );
        setError("Impossible de charger les informations de l'utilisateur.");
      } finally {
        setLoading(false); // Le chargement initial est terminé
      }
    };
    getUserAndSetFormData();
  }, []); // [] signifie que cet effet ne s'exécute qu'une seule fois au montage

  // --- Gestion des changements dans les champs du formulaire ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --- Gestion de la soumission du formulaire ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Active le chargement pour la soumission
    setError(null);
    setSuccess(null);
    navigate(-1);

    try {
      // Appel au service pour soumettre la demande d'adhésion
      await membershipService.submitRequest(formData);
      setSuccess("Votre demande d'adhésion a été soumise avec succès !");
      // Réinitialise le champ message seulement, garde les infos utilisateur pré-remplies
      setFormData((prevData) => ({
        ...prevData,
        role: "member",
        message: "",
      }));
      // Optionnel: rediriger après un certain temps
      // setTimeout(() => navigate('/confirmation-demande'), 3000);
    } catch (err) {
      setError(err.message || "Erreur lors de l'envoi de votre demande.");
    } finally {
      setLoading(false); // Désactive le chargement après la soumission
    }
  };

  // --- Rendu conditionnel basé sur l'état de chargement et d'erreur ---
  // Affiche le composant Loading tant que l'utilisateur n'est pas chargé
  if (loading) {
    return <Loading />;
  }

  // Affiche un message d'erreur si le chargement de l'utilisateur a échoué
  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-center text-red-700 text-xl font-semibold">
          Erreur lors du chargement des informations utilisateur : {error}
        </p>
      </div>
    );
  }

  // --- Rendu du formulaire ---
  return (
    <div className="bg-gray-300/60 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Demande d'Adhésion
        </h2>

        {/* Affichage des messages de succès et d'erreur de soumission */}
        {success && (
          <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </p>
        )}
        {error && ( // Affiche l'erreur de soumission si elle existe
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nom"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Nom:
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              readOnly={!!user} //{/* Rend le champ en lecture seule si l'utilisateur est connecté */}
            />
          </div>
          <div>
            <label
              htmlFor="prenom"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Prénom:
            </label>
            <input
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              readOnly={!!user} //{/* Rend le champ en lecture seule si l'utilisateur est connecté */}
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-gray-700 font-medium mb-2"
            >
              Rôle
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="appearance-none relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="member">Membre</option>
            </select>
            
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
              required
              readOnly={!!user} //{/* Rend le champ en lecture seule si l'utilisateur est connecté */}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
            >
              Votre message/motivations:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
            ></textarea>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
              disabled={loading} // Désactive le bouton pendant le chargement (soumission)
            >
              {loading ? <Loading /> : "Envoyer la Demande"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
