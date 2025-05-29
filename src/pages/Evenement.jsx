import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { getEvents, createEvent, updateEvent } from '../gateways/eventMongoDBGateways';
import { EventList } from '../composants/Evenements/EventList';
import { EventForm } from '../composants/Evenements/EventForm';
import { EventDetails } from '../composants/Evenements/EventDetails';
import Loading from '../composants/Loading/LoadingButton';

export const Evenement = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.events || []);
    } catch (error) {
      console.error('Erreur lors du chargement des événements:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateEvent = () => {
    setEditingEvent(null);
    setShowForm(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleFormSubmit = async (eventData) => {
    try {
      setLoading(true);
      if (editingEvent) {
        await updateEvent(editingEvent._id, eventData, token);
      } else {
        await createEvent(eventData, token);
      }
      await fetchEvents();
      setShowForm(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de l\'événement:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
    fetchEvents(); // Rafraîchir la liste après la fermeture des détails
  };

  if (loading && events.length === 0) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Événements de l'A.E.E.Y</h1>
          <p className="text-xl mb-8">
            Découvrez et participez aux événements de notre association
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {showForm ? (
          <EventForm
            event={editingEvent}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        ) : (
          <EventList
            events={events}
            onEventClick={handleEventClick}
            isAdmin={user?.role === 'admin'}
            onCreateEvent={handleCreateEvent}
          />
        )}

        {selectedEvent && (
          <EventDetails
            event={selectedEvent}
            userToken={token}
            userId={user?._id}
            isAdmin={user?.role === 'admin'}
            onClose={handleCloseDetails}
          />
        )}
      </div>
    </div>
  );
};