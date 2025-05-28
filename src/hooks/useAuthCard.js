import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const allowedRoles = [
  "member",
  "admin",
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

export const useAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem("redirectAfterLogin", pathname);
      navigate("/connexion");
      return;
    }

    try {
      const decoded = jwtDecode(token);

      if (!allowedRoles.includes(decoded.role)) {
        localStorage.setItem("redirectAfterLogin", pathname);
        navigate("/connexion");
        return;
      }

      // Redirection si non-membre validé accède à /profil
      if (pathname === "/profil") {
        if (
          (decoded.role === "member" && !decoded.isValidated) ||
          decoded.role === "donor" ||
          decoded.role === "invite"
        ) {
          navigate("/profilrestreint");
        }
      }

    } catch (err) {
      console.error("Token invalide :", err);
      localStorage.setItem("redirectAfterLogin", location.pathname);
      navigate("/connexion");
    }
  }, [navigate, location]);
};
