import { useState } from 'react';
import PropTypes from 'prop-types';

export const EventForm = ({ event, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    titre: event?.titre || '',
    description: event?.description || '',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    heure: {
      debut: event?.heure?.debut || '',
      fin: event?.heure?.fin || ''
    },
    lieu: {
      nom: event?.lieu?.nom || '',
      adresse: {
        rue: event?.lieu?.adresse?.rue || '',
        ville: event?.lieu?.adresse?.ville || '',
        codePostal: event?.lieu?.adresse?.codePostal || '',
        pays: event?.lieu?.adresse?.pays || ''
      }
    },
    type: event?.type || 'reunion',
    capacite: event?.capacite || '',
    estPublic: event?.estPublic ?? true,
    tags: event?.tags?.join(', ') || ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else if (name === 'tags') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titre</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="reunion">Réunion</option>
              <option value="formation">Formation</option>
              <option value="conference">Conférence</option>
              <option value="social">Social</option>
              <option value="autre">Autre</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Heure de début</label>
            <input
              type="time"
              name="heure.debut"
              value={formData.heure.debut}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Heure de fin</label>
            <input
              type="time"
              name="heure.fin"
              value={formData.heure.fin}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lieu</label>
          <input
            type="text"
            name="lieu.nom"
            value={formData.lieu.nom}
            onChange={handleChange}
            placeholder="Nom du lieu"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Capacité</label>
            <input
              type="number"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="estPublic"
              checked={formData.estPublic}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Événement public</label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (séparés par des virgules)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="réunion, formation, etc."
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {event ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
};

EventForm.propTypes = {
  event: PropTypes.shape({
    titre: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    heure: PropTypes.shape({
      debut: PropTypes.string,
      fin: PropTypes.string
    }),
    lieu: PropTypes.shape({
      nom: PropTypes.string,
      adresse: PropTypes.shape({
        rue: PropTypes.string,
        ville: PropTypes.string,
        codePostal: PropTypes.string,
        pays: PropTypes.string
      })
    }),
    type: PropTypes.string,
    capacite: PropTypes.number,
    estPublic: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string)
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
}; 