// aeey_client\src\hooks\useUserProfile.jsx
import { useState, useEffect } from "react";
import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
  handleApiError,
} from "../services/api.config";

export const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Charger les infos de profil
  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Aucun token trouvé");
        return;
      }
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "GET",
        headers: getDefaultHeaders(token),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Erreur lors du chargement");

      setUser(data.user);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Mettre à jour le profil
  const updateUserProfile = async (updatedData) => {
    setLoading(true);
    setSuccessMessage(null);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        setError("Aucun token trouvé");
        return;
      }
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "PUT",
        headers: getDefaultHeaders(token),
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Erreur lors de la mise à jour");

      setUser(data.user);
      setSuccessMessage("Profil mis à jour avec succès");
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    error,
    successMessage,
    updateUserProfile,
    refetchProfile: fetchUserProfile,
  };
};
