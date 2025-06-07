// // src/components/Membership/MembershipRequestPage.js
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loading from "../composants/Loading/LoadingButton"; // Assurez-vous que ce chemin est correct
// import { authService } from "../services/authService";
// import { membershipService } from "../services/membershipService";

// export const MembershipRequestPage = () => {
//   const [user, setUser] = useState(null); // L'état pour stocker les infos de l'utilisateur connecté
//   const [formData, setFormData] = useState({
//     nom: "", // Pré-rempli par useEffect
//     prenom: "", // Pré-rempli par useEffect
//     email: "", // Pré-rempli par useEffect
//     message: "", // Champ pour le message de l'utilisateur, essentiel pour la demande
//   });
//   const [loading, setLoading] = useState(true); // Vrai initialement pour charger l'utilisateur
//   const [error, setError] = useState(null); // Pour les messages d'erreur
//   const [success, setSuccess] = useState(null); // Pour les messages de succès
//   const navigate = useNavigate();

//   // --- Hook useEffect pour charger les données de l'utilisateur au montage ---
//   useEffect(() => {
//     const getUserAndSetFormData = async () => {
//       try {
//         const userData = await authService.getCurrentUser(); // Récupère les infos de l'utilisateur
//         if (userData) {
//           setUser(userData); // Met à jour l'état 'user'
//           // Pré-remplir formData avec les données de l'utilisateur
//           setFormData((prevData) => ({
//             ...prevData,
//             nom: userData.nom || "",
//             prenom: userData.prenom || "",
//             email: userData.email || "",
//           }));
//         } else {
//           // Gérer le cas où aucun utilisateur n'est connecté (peut-être rediriger ou afficher un message)
//           setError("Vous devez être connecté pour faire une demande d'adhésion.");
         
//         }
//       } catch (err) {
//         console.error("Erreur lors du chargement des données utilisateur: ", err);
//         setError("Impossible de charger vos informations utilisateur. Veuillez réessayer.");
//       } finally {
//         setLoading(false); // Le chargement initial est terminé
//       }
//     };
//     getUserAndSetFormData();
//   }, []); // [] signifie que cet effet ne s'exécute qu'une seule fois au montage

//   // --- Gestion des changements dans les champs du formulaire ---
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // --- Gestion de la soumission du formulaire ---
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Empêche le rechargement de la page
//     setLoading(true); // Active l'indicateur de chargement
//     setError(null); // Efface les erreurs précédentes
//     setSuccess(null); // Efface les succès précédents

//     try {
//       // Le backend 'submitMembershipRequest' n'attend que le 'message'
//       // et récupère le nom/prénom/email de l'utilisateur via le token.
//       // Donc, nous envoyons seulement le message.
//       await membershipService.submitRequest({ message: formData.message });

//       setSuccess("Votre demande d'adhésion a été soumise avec succès ! Elle est en attente d'approbation.");
      
//       // Réinitialise le champ message seulement
//       setFormData((prevData) => ({
//         ...prevData,
//         message: "",
//       }));

//       // Redirection après un délai pour laisser l'utilisateur voir le message de succès
//       setTimeout(() => {
//         navigate(-1); // Redirige vers la page d'accueil ou une page de confirmation
//       }, 3000); // Redirection après 3 secondes

//     } catch (err) {
//       console.error("Erreur lors de l'envoi de la demande:", err);
//       // Affiche l'erreur reçue du service/backend
//       setError(err.message || "Une erreur est survenue lors de l'envoi de votre demande.");
//     } finally {
//       setLoading(false); // Désactive l'indicateur de chargement
//     }
//   };

//   // --- Rendu conditionnel basé sur l'état de chargement et d'erreur initial ---
//   if (loading) {
//     return <Loading />;
//   }

//   if (error && !user) { // Si une erreur est survenue AU CHARGEMENT et qu'aucun utilisateur n'est trouvé
//     return (
//       <div className="min-h-screen flex items-center justify-center p-4">
//         <p className="text-center text-red-700 text-xl font-semibold">
//           {error}
//         </p>
//       </div>
//     );
//   }

//   // --- Rendu du formulaire ---
//   return (
//     <div className="bg-gray-300/60 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 transition-all duration-300">
//         <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
//           Demande d'Adhésion
//         </h2>

//         {/* Affichage des messages de succès et d'erreur après soumission */}
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
//               readOnly={true} // Rendu en lecture seule car pré-rempli
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
//               readOnly={true} // Rendu en lecture seule car pré-rempli
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
//               readOnly={true} // Rendu en lecture seule car pré-rempli
//             />
//           </div>
          
//           {/* Le champ Rôle est retiré car l'utilisateur ne le choisit pas, c'est une demande de 'member' */}
//           {/* <option value="member">Membre</option> est géré par le backend */}
          
//           <div>
//             <label
//               htmlFor="message"
//               className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
//             >
//               Vos motivations ou message:
//             </label>
//             <textarea
//               id="message"
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               rows="4"
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
//               placeholder="Décrivez pourquoi vous souhaitez devenir membre..."
//             ></textarea>
//           </div>
//           <div className="flex justify-center mt-6">
//             <button
//               type="submit"
//               className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
//               disabled={loading} // Désactive le bouton pendant le chargement (soumission)
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
import Loading from "../composants/Loading/LoadingButton"; 
import { authService } from "../services/authService"; 
import { membershipService } from "../services/membershipService"; 

export const MembershipRequestPage = () => {
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    nom: "", 
    prenom: "", 
    email: "", 
    message: "", 
  });
  const [loading, setLoading] = useState(true); 
  const [fetchError, setFetchError] = useState(null); // Erreur lors du chargement initial de l'utilisateur
  const [submitError, setSubmitError] = useState(null); // Erreur lors de la soumission du formulaire
  const [success, setSuccess] = useState(null); 
  const navigate = useNavigate();

  // --- Hook useEffect pour charger les données de l'utilisateur au montage ---
  useEffect(() => {
    const getUserAndSetFormData = async () => {
      try {
        const userData = await authService.getCurrentUser(); 
        if (userData) {
          setUser(userData); 
          setFormData((prevData) => ({
            ...prevData,
            nom: userData.nom || "",
            prenom: userData.prenom || "",
            email: userData.email || "",
          }));
        } else {
          // Si pas d'utilisateur, définir l'erreur de récupération
          setFetchError("Vous devez être connecté pour faire une demande d'adhésion.");
          // Optionnel: rediriger immédiatement
          // navigate('/login'); 
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données utilisateur: ", err);
        setFetchError("Impossible de charger vos informations utilisateur. Veuillez vous connecter.");
      } finally {
        setLoading(false); 
      }
    };
    getUserAndSetFormData();
  }, []); 

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
    setLoading(true); 
    setSubmitError(null); // Efface les erreurs de soumission précédentes
    setSuccess(null); 

    try {
      if (!user) { // Double vérification, au cas où l'état user changerait bizarrement
        throw new Error("Vous n'êtes pas connecté pour soumettre la demande.");
      }
      await membershipService.submitRequest({ message: formData.message });

      setSuccess("Votre demande d'adhésion a été soumise avec succès ! Elle est en attente d'approbation.");
      
      setFormData((prevData) => ({
        ...prevData,
        message: "",
      }));

      setTimeout(() => {
        navigate('/'); 
      }, 3000); 

    } catch (err) {
      console.error("Erreur lors de l'envoi de la demande:", err);
      setSubmitError(err.message || "Une erreur est survenue lors de l'envoi de votre demande.");
    } finally {
      setLoading(false); 
    }
  };

  // --- Rendu conditionnel basé sur l'état de chargement et d'erreur initial ---
  if (loading) {
    return <Loading />;
  }

  // Si l'utilisateur n'est PAS connecté (ou si la récupération a échoué)
  if (!user) { // Utilise fetchError pour le message, mais la condition est sur `user`
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-4">Accès Refusé</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
                Veuillez vous connecter pour accéder à cette ressource.
            </p>
            {/* Optionnel: Bouton pour rediriger vers la connexion */}
            <button
                onClick={() => navigate('/login')}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
                Se connecter
            </button>
        </div>
      </div>
    );
  }

  // --- Rendu du formulaire (seulement si l'utilisateur est connecté) ---
  return (
    <div className="bg-gray-300/60 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full p-8 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Demande d'Adhésion
        </h2>

        {success && (
          <p className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </p>
        )}
        {submitError && ( // Affiche l'erreur de soumission si elle existe
          <p className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {submitError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nom" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Nom:
            </label>
            <input type="text" id="nom" name="nom" value={formData.nom} readOnly={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Prénom:
            </label>
            <input type="text" id="prenom" name="prenom" value={formData.prenom} readOnly={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Email:
            </label>
            <input type="email" id="email" name="email" value={formData.email} readOnly={true}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600 cursor-not-allowed"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2">
              Vos motivations ou message:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Décrivez pourquoi vous souhaitez devenir membre..."
            ></textarea>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300"
              disabled={loading} 
            >
              {loading ? <Loading /> : "Envoyer la Demande"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};