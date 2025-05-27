const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const authService = {
  register: async (userData) => {
    try {
      console.log('Tentative d\'inscription avec:', userData);
      console.log('URL de l\'API:', `${API_URL}/User/register`);
      
      const response = await fetch(`${API_URL}/User/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de l\'inscription');
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Stocker la date d'expiration
        const decodedToken = parseJwt(data.token);
        if (decodedToken && decodedToken.exp) {
          localStorage.setItem('tokenExpiration', decodedToken.exp * 1000);
        }
      }
      return data;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw new Error(error.message || 'Erreur lors de l\'inscription');
    }
  },

  login: async (credentials) => {
    try {
      console.log('Tentative de connexion avec:', credentials);
      console.log('URL de l\'API:', `${API_URL}/User/login`);
      
      const loginData = {
        email: credentials.email,
        password: credentials.password
      };

      const response = await fetch(`${API_URL}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      console.log('Statut de la réponse:', response.status);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erreur lors de la connexion');
      }

      const data = await response.json();
      console.log('Réponse du serveur:', data);
      
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Stocker la date d'expiration
        const decodedToken = parseJwt(data.token);
        if (decodedToken && decodedToken.exp) {
          localStorage.setItem('tokenExpiration', decodedToken.exp * 1000);
        }
      }
      return data;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw new Error(error.message || 'Erreur lors de la connexion');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    // Vérifier l'expiration du token
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration) {
      const expirationDate = new Date(parseInt(expiration));
      if (expirationDate <= new Date()) {
        // Token expiré, déconnexion
        authService.logout();
        return false;
      }
    }

    return true;
  },

  getToken: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    // Vérifier l'expiration du token
    const expiration = localStorage.getItem('tokenExpiration');
    if (expiration) {
      const expirationDate = new Date(parseInt(expiration));
      if (expirationDate <= new Date()) {
        // Token expiré, déconnexion
        authService.logout();
        return null;
      }
    }

    return token;
  }
}; 