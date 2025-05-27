// TODO: Remplacer l'URL par l'URL réelle de votre API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getevents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des événements');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    return [];
  }
}; 