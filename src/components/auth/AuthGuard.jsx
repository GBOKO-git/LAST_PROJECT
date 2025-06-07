import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('Pas de token trouvé, redirection vers connexion'); // Log de débogage
        localStorage.setItem('redirectAfterLogin', location.pathname);
        navigate('/connexion');
        return;
      }

      try {
        const decoded = jwtDecode(token);
        console.log('Token décodé:', decoded); // Log de débogage

        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.log('Token expiré, redirection vers connexion'); // Log de débogage
          localStorage.removeItem('token');
          localStorage.setItem('redirectAfterLogin', location.pathname);
          navigate('/connexion');
          return;
        }

        // Vérification des accès selon le rôle
        // console.log('Vérification des permissions:', { // Log de débogage
        //   path: location.pathname,
        //   isAdmin: decoded.isAdmin === true,
        //   isSuperAdmin: decoded.isSuperAdmin === true,
        //   role: decoded.role,
        //   estValide: decoded.estValide === true
        // });

        const isAdmin = decoded.isAdmin === true || decoded.isSuperAdmin === true || decoded.role === 'admin';

        if (location.pathname === '/dashboard' && !isAdmin) {
          console.log('Accès au dashboard refusé, redirection vers profile'); // Log de débogage
          navigate('/profile');
          return;
        }


        if (location.pathname === '/profile') {
          if (!isAdmin && decoded.role === 'member') {
            console.log('Accès au profil autorisé'); // Log de débogage
            navigate('/profile');
            return;
          }
        }

        if (location.pathname === '/profile') {
          if (!isAdmin && (decoded.role === 'user' || (decoded.role === 'member' && decoded.estValide !== true))) {
            console.log('Accès au profil refusé, redirection vers profil restreint'); // Log de débogage
            navigate('/profilRestreint');
            return;
          }
        }

      } catch (error) {
        console.error('Erreur de décodage du token:', error);
        localStorage.removeItem('token');
        localStorage.setItem('redirectAfterLogin', location.pathname);
        navigate('/connexion');
      }
    };

    checkAuth();
  }, [navigate, location]);

  return children;
};

export default AuthGuard; 