// src/services/membershipService.js

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from './api.config';

export const membershipService = {
  /**
   * Envoie une nouvelle demande d'adhésion au backend.
   * @param {Object} requestData - Les données du formulaire de demande (nom, prenom, email, message, etc.).
   * @returns {Promise<Object>} La réponse du backend après l'envoi de la demande.
   */
  submitRequest: async (requestData) => {
    try {
      const response = await fetch(buildApiUrl(`${API_CONFIG}/membership-requests`), { // Exemple d'endpoint
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(requestData),
      });

      // Vérifier si la réponse est OK (statut HTTP 2xx)
      if (!response.ok) {
        const errorData = await response.json(); // Tenter de lire le message d'erreur du backend
        throw new Error(errorData.message || "Échec de l'envoi de la demande d'adhésion.");
      }

      // Si la réponse est OK, retourner les données (souvent un message de succès ou l'objet créé)
      return response.json();
    } catch (error) {
      console.error("Erreur dans submitRequest:", error);
      throw error; // Propager l'erreur pour qu'elle soit gérée par le composant
    }
  },

  // Vous pourriez ajouter d'autres méthodes ici à l'avenir, par exemple :
  // getRequestStatus: async (requestId) => { /* ... */ },
  // cancelRequest: async (requestId) => { /* ... */ },
};