// import { API_CONFIG, buildApiUrl, getDefaultHeaders, handleApiError } from './api.config';

// class AuthService {
//   async login(loginData) {
//     try {
//       const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
//         method: 'POST',
//         headers: getDefaultHeaders(),
//         body: JSON.stringify(loginData)
//       });

//       const data = await handleApiError(response);
//       console.log('Réponse du serveur:', data);

//       // Stocker le token
//       if (data.token) {
//         localStorage.setItem('token', data.token);
//       }

//       // S'assurer que toutes les propriétés de l'utilisateur sont présentes
//       const user = data.user || data; // Le serveur peut renvoyer directement l'utilisateur ou dans un objet user
//       console.log('Données utilisateur reçues:', user);

//       const processedUser = {
//         ...user,
//         role: user.role || 'user',
//         estValide: user.estValide === true,
//         isAdmin: user.isAdmin === true || user.role === 'admin',
//         isSuperAdmin: user.isSuperAdmin === true
//       };

//       console.log('Données utilisateur traitées:', processedUser);
//       return processedUser;
//     } catch (error) {
//       console.error('Erreur de connexion:', error);
//       throw error;
//     }
//   }

//   async register(registerData) {
//     const transformedData = {
//       nom: registerData.lastName,
//       prenom: registerData.firstName,
//       email: registerData.email,
//       password: registerData.password,
//       role: registerData.role === 'member' ? 'member' : 'user'
//     };

//     const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
//       method: 'POST',
//       headers: getDefaultHeaders(),
//       body: JSON.stringify(transformedData)
//     });

//     const data = await handleApiError(response);
//     if (data.token) {
//       localStorage.setItem('token', data.token);
//     }
//     return data;
//   }

//   async updateProfile(profileData) {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Non authentifié');
//     }

//     const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//       method: 'PUT',
//       headers: getDefaultHeaders(token),
//       body: JSON.stringify(profileData)
//     });

//     return handleApiError(response);
//   }

//   async getCurrentUser() {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return null;
//     }

//     try {
//       const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//         headers: getDefaultHeaders(token)
//       });

//       const data = await handleApiError(response);
//       console.log('Données utilisateur courantes:', data);

//       // Traiter la réponse de la même manière que login
//       const user = data.user || data;
//       return {
//         ...user,
//         role: user.role || 'user' || undefined,
//         estValide: user.estValide === true,
//         isAdmin: user.isAdmin === true || user.role === 'admin',
//         isSuperAdmin: user.isSuperAdmin === true
//       };
//     } catch (error) {
//       console.error('Erreur lors de la récupération du profil:', error);
//       // Si le token est invalide, le supprimer
//       if (error.message === 'Token invalide ou expiré') {
//         this.logout();
//       }
//       throw error;
//     }
//   }

//   logout() {
//     localStorage.removeItem('token');
//   }

//   // async memberRequest(memberData) {
//   //   const token = localStorage.getItem('token');
//   //   if (!token) {
//   //     throw new Error('Non connecté');
//   //   }

//   //   const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//   //     method: 'PUT',
//   //     Headers: getDefaultHeaders(token),
//   //     body: JSON.stringify(memberData)
//   //   });
//   //   return handleApiError(response);
//   // }

// }

// export const authService = new AuthService(); 


// src/services/authService.js

// Assurez-vous que les chemins d'importation sont corrects pour votre projet !
import { API_CONFIG, buildApiUrl, getDefaultHeaders, handleApiError } from './api.config';

class AuthService {
  async login(loginData) {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        // Si getDefaultHeaders a besoin du token (pour 'Authorization'), il doit le récupérer lui-même
        // ou vous devez avoir une version qui ne l'inclut pas pour les requêtes de connexion/inscription.
        // On suppose ici qu'il gère les en-têtes Content-Type.
        headers: getDefaultHeaders(), 
        body: JSON.stringify(loginData)
      });

      const data = await handleApiError(response); // handleApiError gère les statuts non-OK et lève des erreurs
      console.log('Réponse du serveur (login):', data);

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      const user = data.user || data;
      console.log('Données utilisateur reçues (login):', user);

      const processedUser = {
        ...user,
        role: user.role || 'user', // Définit 'user' par défaut si le rôle n'est pas fourni
        estValide: user.estValide === true,
        isAdmin: user.isAdmin === true || user.role === 'admin',
        isSuperAdmin: user.isSuperAdmin === true
      };

      console.log('Données utilisateur traitées (login):', processedUser);
      return processedUser;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error; // Propager l'erreur pour affichage à l'utilisateur
    }
  }

  async register(registerData) {
    const transformedData = {
      nom: registerData.lastName,
      prenom: registerData.firstName,
      email: registerData.email,
      password: registerData.password,
      // Le rôle est 'user' par défaut, même si le formulaire propose 'member',
      // car le rôle 'member' sera attribué via le processus de demande d'adhésion.
      role: 'user' 
    };

    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.REGISTER), {
      method: 'POST',
      headers: getDefaultHeaders(), // Encore une fois, assurez-vous que ceci ne requiert pas de token ici
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
      throw new Error('Non authentifié. Veuillez vous reconnecter.');
    }

    const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
      method: 'PUT',
      headers: getDefaultHeaders(token), // Nécessite le token pour l'authentification
      body: JSON.stringify(profileData)
    });

    return handleApiError(response);
  }

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("getCurrentUser: Aucun token trouvé, retourne null.");
      return null; // TRÈS IMPORTANT: Retourne null si pas de token
    }

    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        headers: getDefaultHeaders(token) // Nécessite le token
      });

      // Utilisez handleApiError pour gérer les réponses non-OK, mais sans propager directement
      // l'erreur si elle indique une non-authentification, car nous la gérons ici.
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erreur inconnue du serveur." }));
        console.error('getCurrentUser: Erreur API lors de la récupération du profil:', response.status, errorData.message);
        
        // Si le statut est 401 (Unauthorized) ou 403 (Forbidden), le token est invalide/expiré
        if (response.status === 401 || response.status === 403) {
          console.log("getCurrentUser: Token invalide/expiré détecté, déconnexion...");
          this.logout(); // Déconnecte l'utilisateur côté client
          return null; // Retourne null pour indiquer qu'aucun utilisateur n'est connecté
        }
        // Pour les autres erreurs non liées à l'authentification (ex: 500 serveur), on peut les propager
        throw new Error(errorData.message || `Erreur lors de la récupération du profil (code: ${response.status}).`);
      }

      const data = await response.json(); // Récupère les données si la réponse est OK
      console.log('Données utilisateur courantes:', data);

      const user = data.user || data;
      return {
        ...user,
        role: user.role || 'user', // Simplifié
        estValide: user.estValide === true,
        isAdmin: user.isAdmin === true || user.role === 'admin',
        isSuperAdmin: user.isSuperAdmin === true
      };
    } catch (error) {
      console.error('getCurrentUser: Erreur inattendue:', error);
      // Pour toute autre erreur inattendue (ex: problème réseau), on peut aussi déconnecter par sécurité
      // et surtout retourner null pour éviter que le composant ne reste bloqué.
      this.logout(); // Nettoyage en cas d'erreur inattendue
      return null; // TRÈS IMPORTANT: Retourne null en cas d'erreur pour que le composant sache qu'il n'y a pas d'utilisateur
    }
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Utilisateur déconnecté, token supprimé.");
  }

  // L'ancienne fonction memberRequest est commentée car elle a été remplacée par membershipService.submitRequest
  // async memberRequest(memberData) { /* ... */ }
}

export const authService = new AuthService();