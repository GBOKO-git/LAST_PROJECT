// aeey_client\src\hooks\useUserProfile.jsx
// import { useState, useEffect } from "react";
// import {
//   API_CONFIG,
//   buildApiUrl,
//   getDefaultHeaders,
//   handleApiError,
// } from "../services/api.config";

// export const useUserProfile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState(null);

//   // Charger les infos de profil
//   const fetchUserProfile = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         setError("Aucun token trouvé");
//         return;
//       }
//       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//         method: "GET",
//         headers: getDefaultHeaders(token),
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

//       setUser(data.user);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   // Mettre à jour le profil
//   const updateUserProfile = async (updatedData) => {
//     setLoading(true);
//     setSuccessMessage(null);
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setLoading(false);
//         setError("Aucun token trouvé");
//         return;
//       }
//       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//         method: "PUT",
//         headers: getDefaultHeaders(token),
//         body: JSON.stringify(updatedData),
//       });

//       const data = await res.json();

//       if (!res.ok)
//         throw new Error(data.message || "Erreur lors de la mise à jour");

//       setUser(data.user);
//       setSuccessMessage("Profil mis à jour avec succès");
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     user,
//     loading,
//     error,
//     successMessage,
//     updateUserProfile,
//     refetchProfile: fetchUserProfile,
//   };
// };


// aeey_client\src\hooks\useUserProfile.jsx
import { useState, useEffect } from "react";
import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
  // handleApiError, // Pas utilisé dans ce snippet, mais gardez si vous l'utilisez ailleurs
} from "../services/api.config";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);


  // Charger les infos de profil
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Aucun token trouvé. Veuillez vous connecter.");
        return;
      }
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "GET",
        headers: getDefaultHeaders(token),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          setError("Session expirée. Veuillez vous reconnecter.");
        }
        throw new Error(data.message || "Erreur lors du chargement du profil");
      }

      setUser(data.user);
      setError(null);
    } catch (err) {
      console.error("Erreur lors du chargement du profil:", err);
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Appel initial au montage du composant
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Mettre à jour le profil (y compris d'autres champs que la photo)
  const updateUserProfile = async (updatedData) => {
    setLoading(true); // Indique un chargement général
    setSuccessMessage(null);
    setError(null); // Réinitialiser l'erreur avant une nouvelle tentative

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Aucun token trouvé. Veuillez vous connecter.");
        return;
      }
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "PUT",
        headers: getDefaultHeaders(token),
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de la mise à jour du profil");
      }

      // Mettre à jour l'utilisateur dans l'état local du hook
      setUser(data.user);
      setSuccessMessage("Profil mis à jour avec succès !");
      setError(null);
      return true; // Indiquer le succès
    } catch (err) {
      console.error("Erreur lors de la mise à jour du profil:", err);
      setError(err.message);
      setSuccessMessage(null);
      return false; // Indiquer l'échec
    } finally {
      setLoading(false);
    }
  };

  // NOUVELLE FONCTION: Mettre à jour la photo de profil
  const updateProfilePhoto = async (photoUrl) => {
    setIsPhotoUploading(true); // Définir l'état de chargement spécifique à la photo
    setPhotoUploadError(null);
    setSuccessMessage(null); // Réinitialiser le message de succès général

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsPhotoUploading(false);
        setPhotoUploadError("Aucun token trouvé. Veuillez vous connecter.");
        return;
      }

      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PHOTO), {
        method: "PUT",
        headers: getDefaultHeaders(token),
        body: JSON.stringify({ photo: photoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Erreur lors de la mise à jour de la photo de profil");
      }

      // Si le backend renvoie l'objet utilisateur mis à jour, utilisez-le
      // Sinon, mettez à jour manuellement la propriété `photo` de l'utilisateur existant
      setUser(prevUser => ({
        ...prevUser,
        photo: photoUrl // Mettre à jour la photo de l'utilisateur dans l'état local du hook
      }));

      setSuccessMessage("Photo de profil mise à jour avec succès !");
      return true; // Indiquer le succès
    } catch (err) {
      console.error("Erreur lors de l'upload de la photo:", err);
      setPhotoUploadError(err.message);
      setSuccessMessage(null);
      return false; // Indiquer l'échec
    } finally {
      setIsPhotoUploading(false); // Fin de l'upload
    }
  };


  return {
    user,
    loading, // Chargement pour les opérations générales (profil, update general)
    error,
    successMessage,
    isPhotoUploading, // Chargement spécifique à l'upload de photo
    photoUploadError, // Erreur spécifique à l'upload de photo

    updateUserProfile,
    updateProfilePhoto, // La nouvelle fonction
    refetchProfile: fetchUserProfile, // Pour recharger manuellement le profil
    setUser, // Permet aux composants de modifier l'état user directement si nécessaire (rare mais utile)
  };
};