import Images from "./EventItems";

export const Evenement = () => {
  return (
    <section className="bg-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Titre */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            📅 Nos événements
          </h2>
          <p className="text-gray-600">
            Retrouvez ici les moments forts de l'AEEY
          </p>
        </div>

        {/* Cartes événements */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cartes d'événements */}
          {Images.map((event, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 hover:opacity-100"></div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton voir tous */}
        <div className="text-center mt-10">
          <a
            href="/evenements"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Voir tous les événements
          </a>
        </div>
      </div>
    </section>
  );
}; 