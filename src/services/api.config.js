// Configuration de base de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL ,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/api/auth/login',
      REGISTER: '/api/auth/register',
      PROFILE: '/api/auth/profile'
    },
    USERS: '/api/auth',
    EVENTS: '/api/events',
    TRANSACTIONS: '/api/transactions',
    PAYMENTS: '/api/payments'
  }
};

// Fonction utilitaire pour construire les URLs de l'API
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Headers par défaut pour les requêtes API
export const getDefaultHeaders = (token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

// Fonction utilitaire pour gérer les erreurs de l'API
export const handleApiError = async (response) => {
  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    let errorMessage;

    try {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || 'Une erreur est survenue';
      } else {
        const text = await response.text();
        errorMessage = text || 'Une erreur est survenue';
      }
    } catch (e) {
      console.error('Erreur lors du parsing de la réponse:', e);
      errorMessage = 'Une erreur est survenue lors du traitement de la réponse';
    }

    if (response.status === 401) {
      errorMessage = 'Token invalide ou expiré';
    }

    throw new Error(errorMessage);
  }

  try {
    return await response.json();
  } catch (e) {
    console.error('Erreur lors du parsing de la réponse:', e);
    throw new Error('Format de réponse invalide');
  }
}; 