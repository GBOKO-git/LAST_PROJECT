import { useEffect, useState } from "react";
import { API_CONFIG, buildApiUrl, getDefaultHeaders, handleApiError } from "../services/api.config";

export const useAdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      try {
        const profileResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
          headers: getDefaultHeaders(token)
        });
        const profileData = await handleApiError(profileResponse);

        const user = profileData?.user;
        console.log("--- DEBUG useAdminMembers ---");
        console.log("User object from backend:", user);
        console.log("user.isAdmin:", user?.isAdmin);
        console.log("user.isSuperAdmin:", user?.isSuperAdmin);
        console.log("--- FIN DEBUG ---");

        if (!user || (!user.isAdmin && !user.isSuperAdmin)) {
          setUnauthorized(true);
          return;
        }

        const membersResponse = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.USERS + '/unvalidated-members'), {
          headers: getDefaultHeaders(token)
        });
        const membersData = await handleApiError(membersResponse);

        if (!Array.isArray(membersData.data)) {
          throw new Error("Réponse invalide du serveur : les membres ne sont pas un tableau");
        }

        setMembers(membersData.data);
      } catch (err) {
        console.error("Erreur lors du chargement des membres :", err);
        setError(err.message || "Erreur inconnue");
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const validate = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/${id}/validate`), {
        method: 'PUT',
        headers: getDefaultHeaders(token)
      });
      await handleApiError(response);

      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Erreur lors de la validation :", err);
      alert("Erreur lors de la validation du membre.");
    }
  };

  const reject = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Rejeter la demande de ce membre ?")) return;

    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG.ENDPOINTS.USERS}/${id}/reject`), {
        method: 'PATCH',
        headers: getDefaultHeaders(token)
      });
      const data = await handleApiError(response);

      if (data.success) {
        setMembers((prev) => prev.filter((m) => m._id !== id));
        alert("Demande rejetée avec succès");
      } else {
        alert("Erreur : " + data.message);
      }
    } catch (err) {
      console.error("Erreur lors du rejet :", err);
      alert("Erreur lors du rejet de la demande.");
    }
  };

  return {
    members,
    loading,
    unauthorized,
    error,
    validate,
    reject,
  };
};
