import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const useAuthForm = (isLogin = true) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    ...(isLogin
      ? {}
      : {
          firstName: "",
          lastName: "",
          confirmPassword: "",
          role: "",
        }),
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validation de l'email
    if (!formData.email) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }

    // Validation du mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
    } else if (!/(?=.*\d)(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password =
        "Le mot de passe doit contenir au moins une majuscule, et un chiffre ";
    }

    // Validations supplémentaires pour l'inscription
    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = "Le prénom est requis";
      }
      if (!formData.lastName) {
        newErrors.lastName = "Le nom est requis";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const response = await authService.login(loginData);
      console.log("Réponse de connexion:", response); // Log de débogage

      // Message de succès
      setErrors({});

      // Récupérer l'URL de redirection stockée
      const redirectUrl = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin"); // Nettoyer après utilisation

      // Vérification détaillée des rôles et permissions
      console.log("Vérification des permissions:", {
        // Log de débogage
        isAdmin: response.isAdmin,
        isSuperAdmin: response.isSuperAdmin,
        role: response.role,
        estValide: response.estValide,
      });

      // Redirection selon le rôle et la validation
      if (
        response.isAdmin === true ||
        response.isSuperAdmin === true ||
        response.role === "admin"
      ) {
        console.log("Redirection vers le dashboard"); // Log de débogage
        navigate("/dashboard");
      } else if (response.role === "member" ) {
        console.log("Redirection vers le profil membre"); // Log de débogage
        navigate(redirectUrl || "/profile");
      } else {
        console.log("Redirection vers le profil restreint"); // Log de débogage
        navigate("/profilRestreint");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error); // Log de débogage
      setErrors({
        general:
          error.message || "Une erreur est survenue. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      console.log("contenu de response à l'inscription", response);
      // Message de succès
      setErrors({});

      // Redirection après inscription réussie
      navigate("/connexion");
    } catch (error) {
      setErrors({
        general:
          error.message ||
          "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRequestMember = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { confirmPassword, ...memberData } = formData;
      const response = await authService.memberRequest(memberData);
      console.log("contenu de la demande membre ", response);

      // message de succès
      setErrors({})

      // Redirection après demande
      navigate(-1)
    } catch (error) {
      console.log("Erreur de demande", error);
      
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleSubmitRegister,
    handleRequestMember
  };
};

export default useAuthForm;
