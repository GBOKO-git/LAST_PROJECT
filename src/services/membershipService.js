
// src/services/membershipService.js

import { API_CONFIG, buildApiUrl, getDefaultHeaders } from './api.config';

export const membershipService = {
  submitRequest: async (requestData) => {
    try {
      const token = localStorage.getItem('token'); // <-- C'est ici que le token est récupéré
     
      if (!token) {
        throw new Error('Non connecté. Veuillez vous authentifier pour soumettre une demande.');
      }

      const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.DEMANDE); 
      
      const headers = getDefaultHeaders(token); 

      const response = await fetch(url, {
        method: 'POST',
        headers: headers, 
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erreur inconnue du serveur." }));
        console.error("Erreur détaillée du backend:", errorData); // Affiche le message d'erreur du backend
        throw new Error(errorData.message || "Échec de l'envoi de la demande d'adhésion.");
      }
      return response.json();
    } catch (error) {
      console.error("Erreur dans membershipService.submitRequest:", error);
      throw error;
    }
  },
};