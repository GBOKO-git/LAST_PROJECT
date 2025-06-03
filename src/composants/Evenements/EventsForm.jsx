// src/components/Forms/EventForm.jsx (ou src/pages/Admin/EventForm.jsx)

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Supposons que vous avez un service pour gérer les requêtes API des événements
// et un hook pour l'authentification afin de récupérer l'ID de l'organisateur.
// Vous devrez créer ou adapter ces fichiers si ce n'est pas déjà fait.
// Par exemple:
// import { eventService } from '../../services/eventService';
// import { useAuth } from '../../hooks/useAuth'; // Ou le nom de votre hook d'authentification

export const EventForm = () => {
  const navigate = useNavigate();
  // const { user } = useAuth(); // Supposons que votre hook d'auth expose l'utilisateur connecté

  // État pour les données du formulaire
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    date: "", // Format YYYY-MM-DD pour input type="date"
    heure: {
      debut: "", // Format HH:MM pour input type="time"
      fin: "", // Format HH:MM pour input type="time"
    },
    lieu: {
      nom: "",
      adresse: {
        rue: "",
        ville: "",
        codePostal: "",
        pays: "",
      },
      coordonnees: {
        latitude: "",
        longitude: "",
      },
    },
    type: "", // Sera initialisé par le premier élément de l'enum ou vide
    image: {
      url: "",
      alt: "",
    },
    capacite: "", // Initialisé à vide, sera converti en nombre
    estPublic: true, // Par défaut, un événement est public
    tags: "", // Gérer les tags comme une chaîne séparée par des virgules initialement
    // documents: [] // Gestion plus complexe, peut être ajouté plus tard
  });

  // État pour les erreurs de validation du formulaire
  const [errors, setErrors] = useState({});
  // État pour le chargement (lors de la soumission)
  const [loading, setLoading] = useState(false);
  // État pour les messages de succès/erreur après soumission
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Enum pour le type d'événement (doit correspondre au modèle backend)
  const eventTypes = ["reunion", "formation", "conference", "social", "autre"];

  // Fonction pour gérer les changements des champs du formulaire
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;

  //   // Gérer les champs imbriqués (heure, lieu, adresse, coordonnees, image)
  //   if (name.startsWith('heure.')) {
  //     setFormData(prev => ({
  //       ...prev,
  //       heure: {
  //         ...prev.heure,
  //         [name.split('.')[1]]: value
  //       }
  //     }));
  //   } else if (name.startsWith('lieu.adresse.')) {
  //     setFormData(prev => ({
  //       ...prev,
  //       lieu: {
  //         ...prev.lieu,
  //         adresse: {
  //           ...prev.lieu.adresse,
  //           [name.split('.')[2]]: value
  //         }
  //       }
  //     }));
  //   } else if (name.startsWith('lieu.coordonnees.')) {
  //     setFormData(prev => ({
  //       ...prev,
  //       lieu: {
  //         ...prev.lieu,
  //         coordonnees: {
  //           ...prev.lieu.coordonnees,
  //           [name.split('.')[2]]: value === '' ? '' : parseFloat(value) // Convertir en nombre ou laisser vide
  //         }
  //       }
  //     }));
  //   } else if (name.startsWith('image.')) {
  //     setFormData(prev => ({
  //       ...prev,
  //       image: {
  //         ...prev.image,
  //         [name.split('.')[1]]: value
  //       }
  //     }));
  //   } else if (name === 'estPublic') {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: type === 'checkbox' ? checked : value
  //     }));
  //   } else {
  //     setFormData(prev => ({
  //       ...prev,
  //       [name]: value
  //     }));
  //   }

  //   // Effacer l'erreur pour ce champ dès que l'utilisateur commence à taper
  //   if (errors[name]) {
  //     setErrors(prev => ({ ...prev, [name]: '' }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
  // console.log('handleChange déclenché pour:', name, 'avec la valeur:', value); // <-- AJOUTEZ CETTE LIGNE

    if (name.startsWith("heure.")) {
      setFormData((prev) => ({
        ...prev,
        heure: {
          ...prev.heure,
          [name.split(".")[1]]: value,
        },
      }));
    } else if (name.startsWith("lieu.adresse.")) {
      setFormData((prev) => ({
        ...prev,
        lieu: {
          ...prev.lieu,
          adresse: {
            ...prev.lieu.adresse,
            [name.split(".")[2]]: value,
          },
        },
      }));
    } else if (name.startsWith("lieu.coordonnees.")) {
      setFormData((prev) => ({
        ...prev,
        lieu: {
          ...prev.lieu,
          coordonnees: {
            ...prev.lieu.coordonnees,
            [name.split(".")[2]]: value === "" ? "" : parseFloat(value), // Convertir en nombre ou laisser vide
          },
        },
      }));
    } else if (name.startsWith("image.")) {
      setFormData((prev) => ({
        ...prev,
        image: {
          ...prev.image,
          [name.split(".")[1]]: value,
        },
      }));
    }
    // --- AJOUTEZ CE BLOC pour gérer spécifiquement 'lieu.nom' ---
    else if (name === "lieu.nom") {
      setFormData((prev) => ({
        ...prev,
        lieu: {
          ...prev.lieu,
          nom: value, // Met à jour la propriété 'nom' à l'intérieur de 'lieu'
        },
      }));
    }
    // -------------------------------------------------------------
    else if (name === "estPublic") {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } // Effacer l'erreur pour ce champ dès que l'utilisateur commence à taper

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Fonction de validation frontend (simple)
  const validateForm = () => {
    const newErrors = {};
    if (!formData.titre.trim()) newErrors.titre = "Le titre est requis.";
    if (!formData.description.trim())
      newErrors.description = "La description est requise.";
    if (!formData.date) newErrors.date = "La date est requise.";
    if (!formData.heure.debut)
      newErrors["heure.debut"] = "L'heure de début est requise.";
    if (!formData.heure.fin)
      newErrors["heure.fin"] = "L'heure de fin est requise.";
    if (!formData.lieu.nom.trim())
      newErrors["lieu.nom"] = "Le nom du lieu est requis.";
    if (!formData.type) newErrors.type = "Le type d'événement est requis.";

    // Validation des heures: s'assurer que l'heure de fin n'est pas avant l'heure de début pour la même journée
    if (formData.date && formData.heure.debut && formData.heure.fin) {
      const dateTimeDebut = new Date(
        `${formData.date}T${formData.heure.debut}`
      );
      const dateTimeFin = new Date(`${formData.date}T${formData.heure.fin}`);
      if (dateTimeFin < dateTimeDebut) {
        newErrors["heure.fin"] =
          "L'heure de fin ne peut pas être antérieure à l'heure de début.";
      }
    }

    // Validation Capacite
    if (
      formData.capacite !== "" &&
      (isNaN(formData.capacite) || formData.capacite < 0)
    ) {
      newErrors.capacite = "La capacité doit être un nombre positif ou nul.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Veuillez corriger les erreurs dans le formulaire.");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    setMessage("");
    setIsSuccess(false);

    try {
      // Préparer les données pour l'envoi au backend
      // Convertir les tags de chaîne en tableau
      const tagsArray = formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : [];

      // Assurez-vous que capacite est un nombre ou null/undefined
      const capaciteValue =
        formData.capacite === "" ? undefined : parseInt(formData.capacite, 10);

      const eventData = {
        ...formData,
        tags: tagsArray,
        capacite: capaciteValue,
        // organisteur: user ? user.id : 'ID_ORGA_PAR_DEFAUT_OU_ERREUR', // Récupérer l'ID de l'utilisateur connecté
        // IMPORTANT: Assurez-vous que l'organisateur est valide !
      };
      // Supprimez les champs d'adresse vides si vous ne voulez pas les envoyer
      if (
        !eventData.lieu.adresse.rue &&
        !eventData.lieu.adresse.ville &&
        !eventData.lieu.adresse.codePostal &&
        !eventData.lieu.adresse.pays
      ) {
        delete eventData.lieu.adresse;
      }
      if (
        !eventData.lieu.coordonnees.latitude &&
        !eventData.lieu.coordonnees.longitude
      ) {
        delete eventData.lieu.coordonnees;
      }
      if (!eventData.image.url && !eventData.image.alt) {
        delete eventData.image;
      }

      // **Envoyer les données au backend via votre service API**
      // Exemple: const response = await eventService.createEvent(eventData);
      // Pour l'instant, simulons une API :
      console.log("Données de l'événement à envoyer:", eventData);
      const fakeApiResponse = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({ success: true, message: "Événement créé avec succès !" });
        }, 1000)
      ); // Simule un délai API

      if (fakeApiResponse.success) {
        setMessage(fakeApiResponse.message);
        setIsSuccess(true);
        setFormData({
          // Réinitialiser le formulaire après succès
          titre: "",
          description: "",
          date: "",
          heure: { debut: "", fin: "" },
          lieu: {
            nom: "",
            adresse: { rue: "", ville: "", codePostal: "", pays: "" },
            coordonnees: { latitude: "", longitude: "" },
          },
          type: "",
          image: { url: "", alt: "" },
          capacite: "",
          estPublic: true,
          tags: "",
        });
        // Optionnel: Rediriger l'utilisateur après un court délai
        // setTimeout(() => navigate('/evenements'), 2000);
      } else {
        setMessage(
          fakeApiResponse.message || "Échec de la création de l'événement."
        );
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Erreur lors de la création de l'événement:", error);
      setMessage(
        error.response?.data?.message || "Une erreur inattendue est survenue."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg my-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Créer un Nouvel Événement
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md text-center ${
            isSuccess
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Titre */}
        <div>
          <label
            htmlFor="titre"
            className="block text-sm font-medium text-gray-700"
          >
            Titre de l'événement <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="titre"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          {errors.titre && (
            <p className="mt-1 text-sm text-red-600">{errors.titre}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date}</p>
          )}
        </div>

        {/* Heure de début et Heure de fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="heure.debut"
              className="block text-sm font-medium text-gray-700"
            >
              Heure de début <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="heure.debut"
              name="heure.debut"
              value={formData.heure.debut}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {errors["heure.debut"] && (
              <p className="mt-1 text-sm text-red-600">
                {errors["heure.debut"]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="heure.fin"
              className="block text-sm font-medium text-gray-700"
            >
              Heure de fin <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              id="heure.fin"
              name="heure.fin"
              value={formData.heure.fin}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
            {errors["heure.fin"] && (
              <p className="mt-1 text-sm text-red-600">{errors["heure.fin"]}</p>
            )}
          </div>
        </div>

        {/* Lieu (Nom du lieu) */}
        <div>
          <label
            htmlFor="lieu.nom"
            className="block text-sm font-medium text-gray-700"
          >
            Nom du Lieu <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="lieu.nom"
            name="lieu.nom"
            value={formData.lieu.nom}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            // required
          />
          {errors["lieu.nom"] && (
            <p className="mt-1 text-sm text-red-600">{errors["lieu.nom"]}</p>
          )}
        </div>

        {/* Type d'événement */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Type d'événement <span className="text-red-500">*</span>
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          >
            <option value="">Sélectionner un type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="mt-1 text-sm text-red-600">{errors.type}</p>
          )}
        </div>

        {/* Champs Optionnels - Section Lieu (Adresse) */}
        <fieldset className="border p-4 rounded-md shadow-sm">
          <legend className="text-md font-semibold text-gray-800 mb-3">
            Adresse du Lieu (Optionnel)
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lieu.adresse.rue"
                className="block text-sm font-medium text-gray-700"
              >
                Rue
              </label>
              <input
                type="text"
                id="lieu.adresse.rue"
                name="lieu.adresse.rue"
                value={formData.lieu.adresse.rue}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lieu.adresse.ville"
                className="block text-sm font-medium text-gray-700"
              >
                Ville
              </label>
              <input
                type="text"
                id="lieu.adresse.ville"
                name="lieu.adresse.ville"
                value={formData.lieu.adresse.ville}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lieu.adresse.codePostal"
                className="block text-sm font-medium text-gray-700"
              >
                Code Postal
              </label>
              <input
                type="text"
                id="lieu.adresse.codePostal"
                name="lieu.adresse.codePostal"
                value={formData.lieu.adresse.codePostal}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lieu.adresse.pays"
                className="block text-sm font-medium text-gray-700"
              >
                Pays
              </label>
              <input
                type="text"
                id="lieu.adresse.pays"
                name="lieu.adresse.pays"
                value={formData.lieu.adresse.pays}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Champs Optionnels - Section Coordonnées (Géolocalisation) */}
        <fieldset className="border p-4 rounded-md shadow-sm">
          <legend className="text-md font-semibold text-gray-800 mb-3">
            Coordonnées GPS (Optionnel)
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="lieu.coordonnees.latitude"
                className="block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>
              <input
                type="number"
                id="lieu.coordonnees.latitude"
                name="lieu.coordonnees.latitude"
                value={formData.lieu.coordonnees.latitude}
                onChange={handleChange}
                step="any" // Permet des décimales
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lieu.coordonnees.longitude"
                className="block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>
              <input
                type="number"
                id="lieu.coordonnees.longitude"
                name="lieu.coordonnees.longitude"
                value={formData.lieu.coordonnees.longitude}
                onChange={handleChange}
                step="any" // Permet des décimales
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </fieldset>

        {/* Image */}
        <fieldset className="border p-4 rounded-md shadow-sm">
          <legend className="text-md font-semibold text-gray-800 mb-3">
            Image de l'événement (Optionnel)
          </legend>
          <div>
            <label
              htmlFor="image.url"
              className="block text-sm font-medium text-gray-700"
            >
              URL de l'image
            </label>
            <input
              type="text"
              id="image.url"
              name="image.url"
              value={formData.image.url}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Ex: https://example.com/image.jpg"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="image.alt"
              className="block text-sm font-medium text-gray-700"
            >
              Texte alternatif (Alt)
            </label>
            <input
              type="text"
              id="image.alt"
              name="image.alt"
              value={formData.image.alt}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              placeholder="Ex: Image de la conférence annuelle"
            />
          </div>
        </fieldset>

        {/* Capacité */}
        <div>
          <label
            htmlFor="capacite"
            className="block text-sm font-medium text-gray-700"
          >
            Capacité (nombre de participants)
          </label>
          <input
            type="number"
            id="capacite"
            name="capacite"
            value={formData.capacite}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.capacite && (
            <p className="mt-1 text-sm text-red-600">{errors.capacite}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700"
          >
            Tags (séparés par des virgules)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ex: conférence, technologie, IA"
          />
        </div>

        {/* Est Public */}
        <div className="flex items-center">
          <input
            id="estPublic"
            name="estPublic"
            type="checkbox"
            checked={formData.estPublic}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="estPublic"
            className="ml-2 block text-sm text-gray-900"
          >
            Événement public (visible par tous)
          </label>
        </div>

        {/* Bouton de soumission */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Création en cours..." : "Créer l'événement"}
          </button>
        </div>
      </form>
    </div>
  );
};
