import { Link } from 'react-router-dom';

export const RejoignezNous = () => {
  return (
    <section className="bg-blue-900 text-white py-20 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          👥 Rejoignez-nous !
        </h2>
        <p className="text-lg md:text-xl mb-8">
          Envie de faire partie de l'AEEY ? Rejoignez notre communauté d'élèves
          et d'étudiants engagés.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/inscription"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
          >
            S'inscrire
          </Link>
          <Link
            to="/connexion"
            className="bg-white hover:bg-gray-100 text-blue-900 py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </section>
  );
}; 