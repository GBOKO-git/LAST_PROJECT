// src/hooks/useDonateurData.jsx

import { useEffect, useState } from 'react';
import { authService } from '../services/authService';
export const useDonateurData = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Commencer le chargement
      setError(null);   // Réinitialiser l'erreur

      try {
        // Appeler la fonction getCurrentUser de authService
        const data = await authService.getCurrentUser();
        if (data) {
          setUserData(data); // Définir les données utilisateur
        } else {
          setError('Aucune donnée utilisateur trouvée. Veuillez vous reconnecter.');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données donateur:', err);
        setError(err.message || 'Une erreur est survenue lors du chargement des données.');
      } finally {
        setLoading(false); // Terminer le chargement
      }
    };

    fetchData();
  }, []); // Le tableau de dépendances vide signifie que ce hook s'exécute une seule fois au montage

  return { userData, loading, error };
};