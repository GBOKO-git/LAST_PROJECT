export const About = () => {
  return (
    <section className="bg-white text-gray-800 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Qui sommes-nous ?
        </h2>
        <p className="text-lg md:text-xl font-medium mb-8">
          L'
          <strong>
            Association des Élèves et Étudiants de Yaokro (AEEY)
          </strong>{" "}
          est un cadre de rassemblement, de solidarité et de développement pour
          les jeunes de Yaokro engagés dans des études secondaires et
          supérieures.
        </p>
        <p className="mb-8 md:text-xl font-medium">
          L'AEEY est une organisation estudiantine dynamique regroupant les
          élèves et étudiants originaires de Yaokro. Elle a pour mission de
          promouvoir la solidarité, l'excellence académique, le développement
          personnel et l'engagement communautaire de ses membres à travers des
          activités culturelles, éducatives et sociales. Notre association est
          un cadre d'entraide, de partage et de valorisation de notre identité,
          où chaque membre trouve soutien et inspiration pour réussir son
          parcours scolaire et universitaire.
        </p>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Nos valeurs
            </h3>
            <p>
              Solidarité, excellence, respect, entraide et engagement citoyen
              guident chacune de nos actions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Notre histoire
            </h3>
            <p>
              Depuis sa création, l'AEEY œuvre à l'unité des jeunes de Yaokro et
              à leur épanouissement à travers diverses initiatives.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              Nos projets
            </h3>
            <p>
              Activités culturelles, soutien scolaire, actions sociales et
              organisation d'événements pour fédérer et inspirer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}; 