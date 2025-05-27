const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
      
      // Stocker le token dans le localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
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
      
      // Assurez-vous que seuls email et password sont envoyés
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
      
      // Stocker le token dans le localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      return data;
    } catch (error) {
      console.error('Erreur détaillée:', error);
      throw new Error(error.message || 'Erreur lors de la connexion');
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  }
}; 