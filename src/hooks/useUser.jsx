import { useEffect, useState } from "react";
import { API_CONFIG, buildApiUrl, getDefaultHeaders } from "../services/api.config";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          setError("Aucun token trouvé");
          return;
        }

        const response = await fetch(
          buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE),
          {
            headers: getDefaultHeaders(token),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur serveur");
        }

        if (!data || !data.user) {
          throw new Error("Données utilisateur invalides");
        }

        setUser(data.user);
        setError(null);
      } catch (err) {
        console.error("Erreur de récupération de l'utilisateur:", err);
        setError(err.message || "Échec de la récupération des données utilisateur");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Retourne un objet avec une valeur par défaut pour user
  return {
    user: user || null,
    loading,
    error,
    isAuthenticated: !!user
  };
};
