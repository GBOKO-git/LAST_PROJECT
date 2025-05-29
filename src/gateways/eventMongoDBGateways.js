// TODO: Remplacer l'URL par l'URL réelle de votre API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Fonction utilitaire pour gérer les erreurs
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Une erreur est survenue');
  }
  return response.json();
};

// Récupérer tous les événements avec filtres optionnels
export const getEvents = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.type) queryParams.append('type', filters.type);
    if (filters.date) queryParams.append('date', filters.date);
    if (filters.search) queryParams.append('search', filters.search);

    const response = await fetch(`${API_URL}/events?${queryParams}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Récupérer un événement spécifique
export const getEventById = async (eventId) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`);
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Créer un nouvel événement
export const createEvent = async (eventData, token) => {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Mettre à jour un événement
export const updateEvent = async (eventId, eventData, token) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(eventData)
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Supprimer un événement
export const deleteEvent = async (eventId, token) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// S'inscrire à un événement
export const registerForEvent = async (eventId, token) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Se désinscrire d'un événement
export const unregisterFromEvent = async (eventId, token) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/register`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
};

// Mettre à jour le statut d'un participant
export const updateParticipantStatus = async (eventId, participantId, status, token) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/participants`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        participantId,
        statut: status
      })
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erreur:', error);
    throw error;
  }
}; 