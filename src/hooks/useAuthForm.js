import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const useAuthForm = (isLogin = true) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(isLogin ? {} : {
      firstName: '',
      lastName: '',
      confirmPassword: '',
      role: 'invite'
    })
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
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
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
      // Pour la connexion, on n'envoie que email et password
      const loginData = {
        email: formData.email,
        password: formData.password
      };
      
      const response = await authService.login(loginData);
      
      // Redirection après connexion réussie
      navigate('/profil');
      
    } catch (error) {
      setErrors({
        general: error.message || "Une erreur est survenue. Veuillez réessayer."
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
      // Pour l'inscription, on envoie toutes les données sauf confirmPassword
      const { confirmPassword, ...registerData } = formData;
      const response = await authService.register(registerData);
      
      // Redirection après inscription réussie
      navigate('/profil');
      
    } catch (error) {
      setErrors({
        general: error.message || "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      });
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
    handleSubmitRegister
  };
};

export default useAuthForm; 