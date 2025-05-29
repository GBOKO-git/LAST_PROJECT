import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { registerForEvent, unregisterFromEvent, updateParticipantStatus } from '../../gateways/eventMongoDBGateways';

export const EventDetails = ({ event, userToken, userId, isAdmin, onClose }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [participants, setParticipants] = useState(event.participants || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà inscrit
    const userRegistration = event.participants?.find(p => p.user._id === userId);
    setIsRegistered(!!userRegistration);
    setParticipants(event.participants || []);
  }, [event, userId]);

  const handleRegistration = async () => {
    try {
      setLoading(true);
      if (isRegistered) {
        await unregisterFromEvent(event._id, userToken);
        setIsRegistered(false);
        setParticipants(prev => prev.filter(p => p.user._id !== userId));
      } else {
        await registerForEvent(event._id, userToken);
        setIsRegistered(true);
        // Ajouter l'utilisateur à la liste des participants
        setParticipants(prev => [...prev, {
          user: { _id: userId },
          statut: 'en attente',
          dateInscription: new Date()
        }]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription/désinscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (participantId, newStatus) => {
    try {
      setLoading(true);
      await updateParticipantStatus(event._id, participantId, newStatus, userToken);
      setParticipants(prev =>
        prev.map(p =>
          p._id === participantId ? { ...p, statut: newStatus } : p
        )
      );
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900">{event.titre}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Fermer</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">Informations générales</h3>
              <p className="mt-2 text-gray-600">{event.description}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900">Date et heure</h4>
              <p className="text-gray-600">
                {formatDate(event.date)}<br />
                De {event.heure.debut} à {event.heure.fin}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900">Lieu</h4>
              <p className="text-gray-600">
                {event.lieu.nom}
                {event.lieu.adresse && (
                  <>
                    <br />
                    {event.lieu.adresse.rue}
                    <br />
                    {event.lieu.adresse.codePostal} {event.lieu.adresse.ville}
                    <br />
                    {event.lieu.adresse.pays}
                  </>
                )}
              </p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900">Type d'événement</h4>
              <p className="text-gray-600 capitalize">{event.type}</p>
            </div>

            {event.capacite && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">Capacité</h4>
                <p className="text-gray-600">
                  {participants.filter(p => p.statut === 'confirmé').length} / {event.capacite} places
                </p>
              </div>
            )}

            {event.tags && event.tags.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-900">Tags</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Participants</h3>
              <div className="space-y-4">
                {participants.map((participant) => (
                  <div
                    key={participant._id}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{participant.user.nom} {participant.user.prenom}</p>
                      <p className="text-sm text-gray-500">
                        Inscrit le {formatDate(participant.dateInscription)}
                      </p>
                    </div>
                    {isAdmin && (
                      <select
                        value={participant.statut}
                        onChange={(e) => handleStatusUpdate(participant._id, e.target.value)}
                        className="ml-4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        disabled={loading}
                      >
                        <option value="en attente">En attente</option>
                        <option value="confirmé">Confirmé</option>
                        <option value="annulé">Annulé</option>
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleRegistration}
                disabled={loading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                  ${isRegistered
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
              >
                {loading ? 'Chargement...' : (isRegistered ? 'Se désinscrire' : 'S\'inscrire')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

EventDetails.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    heure: PropTypes.shape({
      debut: PropTypes.string.isRequired,
      fin: PropTypes.string.isRequired
    }).isRequired,
    lieu: PropTypes.shape({
      nom: PropTypes.string.isRequired,
      adresse: PropTypes.shape({
        rue: PropTypes.string,
        ville: PropTypes.string,
        codePostal: PropTypes.string,
        pays: PropTypes.string
      })
    }).isRequired,
    type: PropTypes.string.isRequired,
    capacite: PropTypes.number,
    estPublic: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        user: PropTypes.shape({
          _id: PropTypes.string.isRequired,
          nom: PropTypes.string,
          prenom: PropTypes.string
        }).isRequired,
        statut: PropTypes.string.isRequired,
        dateInscription: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  userToken: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}; 