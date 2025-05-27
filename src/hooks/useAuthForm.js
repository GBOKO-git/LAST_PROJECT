import { useState } from 'react';

const useAuthForm = (isLogin = true) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    ...(isLogin ? {} : {
      name: '',
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
      if (!formData.name) {
        newErrors.name = "Le nom est requis";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      }
      if (!formData.role) {
        newErrors.role = "Le rôle est requis";
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
      // TODO: Implémenter l'appel API
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      console.log(`Envoi des données vers ${endpoint}:`, formData);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Gérer la réponse de l'API
      
    } catch (error) {
      setErrors({
        general: "Une erreur est survenue. Veuillez réessayer."
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
      // TODO: Implémenter l'appel API d'inscription
      console.log('Envoi des données d\'inscription:', formData);
      
      // Simuler un délai d'API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Gérer la réponse de l'API et la redirection
      
    } catch (error) {
      setErrors({
        general: "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
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