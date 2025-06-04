import { API_CONFIG, buildApiUrl, getDefaultHeaders, handleApiError } from './api.config';

class AuthService {
  async login(loginData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(loginData)
      });

      const data = await handleApiError(response);
      console.log('Réponse du serveur:', data);

      // Stocker le token
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      // S'assurer que toutes les propriétés de l'utilisateur sont présentes
      const user = data.user || data; // Le serveur peut renvoyer directement l'utilisateur ou dans un objet user
      console.log('Données utilisateur reçues:', user);

      const processedUser = {
        ...user,
        role: user.role || 'user',
        estValide: user.estValide === true,
        isAdmin: user.isAdmin === true || user.role === 'admin',
        isSuperAdmin: user.isSuperAdmin === true
      };

      console.log('Données utilisateur traitées:', processedUser);
      return processedUser;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }

  async register(registerData) {
    const transformedData = {
      nom: registerData.lastName,
      prenom: registerData.firstName,
      email: registerData.email,
      password: registerData.password,
      role: registerData.role === 'member' ? 'member' : 'user'
    };

    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
      method: 'POST',
      headers: getDefaultHeaders(),
      body: JSON.stringify(transformedData)
    });

    const data = await handleApiError(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async updateProfile(profileData) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Non authentifié');
    }

    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
      method: 'PUT',
      headers: getDefaultHeaders(token),
      body: JSON.stringify(profileData)
    });

    return handleApiError(response);
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        headers: getDefaultHeaders(token)
      });

      const data = await handleApiError(response);
      console.log('Données utilisateur courantes:', data);

      // Traiter la réponse de la même manière que login
      const user = data.user || data;
      return {
        ...user,
        role: user.role || 'invite',
        estValide: user.estValide === true,
        isAdmin: user.isAdmin === true || user.role === 'admin',
        isSuperAdmin: user.isSuperAdmin === true
      };
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      // Si le token est invalide, le supprimer
      if (error.message === 'Token invalide ou expiré') {
        this.logout();
      }
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export const authService = new AuthService(); 