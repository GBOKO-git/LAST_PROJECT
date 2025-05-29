// src/components/auth/AuthGuard.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// Cette liste 'defaultAllowedRoles' reste pertinente pour les vérifications générales
// si un 'requiredRole' spécifique n'est pas demandé.
const defaultAllowedRoles = [
  "member",
  "admin", // Gardons 'admin' ici au cas où le champ 'role' est aussi utilisé pour d'autres types d'admins non 'isSuperAdmin' etc.
  "president",
  "president fondateur",
  "parain",
  "mareine",
  "vice-president",
  "secretaire",
  "secretaire-adjoint",
  "tresorier",
  "tresorier-adjoint",
  "donor",
  "invite",
];

export const useAuthGuard = (requiredRole = null) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const pathname = location.pathname;
      const token = localStorage.getItem("token");

      // 1. CAS : Pas de token (non authentifié)
      if (!token) {
        console.log("No token found. Redirecting to login.");
        if (pathname !== "/connexion") {
          localStorage.setItem("redirectAfterLogin", pathname);
          navigate("/connexion");
        }
        setIsAuthChecked(true);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const userRole = decoded.role;
        // NOUVEAU : Récupération des flags isAdmin, isSuperAdmin, estValide
        const isAdmin = decoded.isAdmin || false; // S'assurer que c'est bien un booléen
        const isSuperAdmin = decoded.isSuperAdmin || false;
        const estValide = decoded.estValide || false;

        console.log(`User decoded:`, decoded);
        console.log(`User role: ${userRole}. isAdmin: ${isAdmin}. Path: ${pathname}. Required role: ${requiredRole}`);

        // 2. CAS : Vérification du rôle spécifique si 'requiredRole' est fourni
        // Cette partie va maintenant regarder le champ 'isAdmin' pour le rôle 'admin'.
        if (requiredRole) {
            if (requiredRole === "admin") {
                // Si le rôle requis est 'admin', on vérifie le champ 'isAdmin'
                if (!isAdmin) {
                    console.warn(`Access denied. User is not an admin. Role: ${userRole}, isAdmin: ${isAdmin}. Path: ${pathname}.`);
                    navigate("/connexion"); // Ou une page d'accès refusé
                    setIsAuthChecked(true);
                    return;
                }
            } else if (userRole !== requiredRole) {
                // Pour les autres rôles spécifiques (ex: "member", "donor"), on vérifie le champ 'role'
                console.warn(`Access denied. Role '<span class="math-inline">\{userRole\}' cannot access '</span>{pathname}'. Required role: '${requiredRole}'.`);
                navigate("/connexion");
                setIsAuthChecked(true);
                return;
            }
        }


        // 3. CAS : Vérification des rôles autorisés par défaut
        // S'applique si aucun 'requiredRole' n'a été spécifié OU si le 'requiredRole' spécifique a été satisfait
        // et que le rôle de l'utilisateur n'est pas dans la liste générale des rôles autorisés.
        // Cette vérification est moins critique si le 'requiredRole' gère déjà tout.
        // On peut la laisser pour une sécurité générale.
        if (!defaultAllowedRoles.includes(userRole)) {
          console.warn("Unauthorized role detected in general list:", userRole);
          if (pathname !== "/connexion") {
            localStorage.setItem("redirectAfterLogin", pathname);
            navigate("/connexion");
          }
          setIsAuthChecked(true);
          return;
        }

        // 4. CAS : Logique spécifique pour la page /profile
        // Redirection vers /profilRestreint si le profil n'est pas validé ou si c'est un 'donor'/'invite'
        if (pathname === "/profile" || pathname.startsWith("/profile/")) {
          if (
            (userRole === "member" && !estValide) || // Utilisation de 'estValide'
            userRole === "donor" ||
            userRole === "invite"
          ) {
            console.log(`Redirecting from /profile to /profilRestreint for role: ${userRole}, estValide: ${estValide}`);
            if (pathname !== "/profilRestreint") {
              navigate("/profilRestreint");
            }
            setIsAuthChecked(true);
            return;
          }
        }

        // 5. CAS : Gestion des redirections après connexion réussie
        if (pathname === "/connexion" && localStorage.getItem("redirectAfterLogin")) {
            const redirectTo = localStorage.getItem("redirectAfterLogin");
            localStorage.removeItem("redirectAfterLogin");
            navigate(redirectTo, { replace: true });
        } else if (pathname === "/connexion") {
            navigate("/profile", { replace: true });
        }

        setIsAuthChecked(true);

      } catch (err) {
        // 6. CAS : Token invalide ou expiré
        console.error("Invalid token or decoding error:", err);
        localStorage.removeItem("token");
        if (pathname !== "/connexion") {
          localStorage.setItem("redirectAfterLogin", pathname);
          navigate("/connexion");
        }
        setIsAuthChecked(true);
      }
    };

    checkAuth();
  }, [navigate, location.pathname, requiredRole]);

  return { isAuthChecked };
};

const AuthGuard = ({ children, requiredRole }) => {
    const { isAuthChecked } = useAuthGuard(requiredRole);

    if (!isAuthChecked) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AuthGuard;