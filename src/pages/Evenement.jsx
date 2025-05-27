import { useEffect, useState } from "react";
import { getevents } from "../gateways/eventMongoDBGateways";
import Loading from "../composants/Loading/LoadingButton";

// Données de test en attendant la connexion à l'API
const defaultEvents = [
  {
    title: "Assemblée générale",
    description: "Rencontre mensuelle des membres",
    location: "Yaokro chez prési Azoum",
    image: "/images/aeey.jpeg",
    date: "2025-05-25",
  },
  {
    title: "Assemblée générale",
    description: "Rencontre mensuelle des membres",
    location: "Yaokro chez prési Azoum",
    image: "/images/aeey.jpeg",
    date: "2025-05-25",
  },
  {
    title: "Assemblée générale",
    description: "Rencontre mensuelle des membres",
    location: "Yaokro chez prési Azoum",
    image: "/images/aeey.jpeg",
    date: "2025-05-25",
  },
  {
    title: "Assemblée générale",
    description: "Rencontre mensuelle des membres",
    location: "Yaokro chez prési Azoum",
    image: "/images/aeey.jpeg",
    date: "2025-05-25",
  },
  {
    title: "Assemblée générale",
    description: "Rencontre mensuelle des membres",
    location: "Yaokro chez prési Azoum",
    image: "/images/aeey.jpeg",
    date: "2025-05-25",
  },
];

export const Evenement = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const getAllEvents = async () => {
    try {
      const fetchedEvents = await getevents();
      setEvents(fetchedEvents.length > 0 ? fetchedEvents : defaultEvents);
    } catch (error) {
      console.error("Erreur lors du chargement des événements:", error.message);
      setEvents(defaultEvents);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="text-center py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Bienvenue à l'A.E.E.Y</h1>
          <p className="text-xl mb-8">Découvrez nos derniers événements</p>
          <h2 className="text-2xl font-bold">Événements à venir</h2>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105"
            >
              <img
                className="w-full h-48 object-cover"
                src={event.image}
                alt={event.title}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Lieu:</span> {event.location}
                </p>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <div className="flex items-center justify-between">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    Voir plus
                  </button>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center text-gray-500 text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {event.attendees?.length || 0}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(event.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};