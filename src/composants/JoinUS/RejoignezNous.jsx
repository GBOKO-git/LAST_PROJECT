const RejoignezNous = () => {
  return (
    <section className="py-20 bg-blue-600">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">
          Rejoignez notre association
        </h2>
        <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
          Ensemble, construisons un avenir meilleur pour la jeunesse de Yaokro.
          Devenez membre de notre association et participez à nos actions.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition duration-300 font-bold">
            Devenir membre
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default RejoignezNous; 