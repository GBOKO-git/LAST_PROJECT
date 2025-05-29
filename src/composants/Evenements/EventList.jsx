import { useState } from 'react';
import PropTypes from 'prop-types';

export const EventList = ({ events, onEventClick, isAdmin, onCreateEvent }) => {
  const [filters, setFilters] = useState({
    type: '',
    search: '',
    date: ''
  });

  const filteredEvents = events.filter(event => {
    const matchType = !filters.type || event.type === filters.type;
    const matchSearch = !filters.search || 
      event.titre.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.tags?.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()));
    const matchDate = !filters.date || new Date(event.date).toISOString().split('T')[0] === filters.date;

    return matchType && matchSearch && matchDate;
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rechercher
            </label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Rechercher un événement..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Tous les types</option>
              <option value="reunion">Réunion</option>
              <option value="formation">Formation</option>
              <option value="conference">Conférence</option>
              <option value="social">Social</option>
              <option value="autre">Autre</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {isAdmin && (
            <div className="flex items-end">
              <button
                onClick={onCreateEvent}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Créer un événement
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 cursor-pointer"
            onClick={() => onEventClick(event)}
          >
            {event.image?.url && (
              <img
                className="w-full h-48 object-cover"
                src={event.image.url}
                alt={event.image.alt || event.titre}
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{event.titre}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  event.statut === 'planifié' ? 'bg-green-100 text-green-800' :
                  event.statut === 'en cours' ? 'bg-blue-100 text-blue-800' :
                  event.statut === 'terminé' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {event.statut}
                </span>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(event.date).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </div>

                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {event.lieu.nom}
                </div>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aucun événement ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      titre: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      lieu: PropTypes.shape({
        nom: PropTypes.string.isRequired
      }).isRequired,
      type: PropTypes.string.isRequired,
      statut: PropTypes.string.isRequired,
      image: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string
      }),
      tags: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onEventClick: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onCreateEvent: PropTypes.func.isRequired
}; 