import { useEffect, useState } from "react";
import { API_CONFIG, buildApiUrl, getDefaultHeaders, handleApiError } from "../services/api.config";

export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token non trouvé");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USERS + '/admin/stats'), {
          headers: getDefaultHeaders(token)
        });
        const data = await handleApiError(response);
        setStats(data);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des stats :", err);
        setError(err.message || "Une erreur est survenue");
        setStats(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};
