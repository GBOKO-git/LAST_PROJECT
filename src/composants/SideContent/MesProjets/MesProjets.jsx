export  const MesProjets = () => {
  return (
    <>
      <section className="bg-blue-950/80 min-h-screen py-10 h-full flex items-center text-white px-4 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* <!-- Left Side: Contact Details --> */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Avez-vous un projet ? <br />
              <span className="text-gray-300">N'hésitez pas à nous envoyer un message.</span>
            </h2>
            <p className="mt-4 text-gray-400">
              Contactez-nous et dites-nous comment nous pouvons vous aider. Remplissez le formulaire et je vous contacterai dans les plus brefs délais.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start space-x-4">
                <span className="text-xl text-gray-400">📍</span>
                <div>
                  <p className="font-semibold">Addresse:</p>
                  <p className="text-gray-400">
                    89/9 Mothijheel, Dhaka, Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl text-gray-400">📞</span>
                <div>
                  <p className="font-semibold">Téléphone:</p>
                  <p className="text-gray-400">+225 0758019243</p>
                  <p className="text-gray-400">+225 0504411798</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <span className="text-xl text-gray-400">✉️</span>
                <div>
                  <p className="font-semibold">Email:</p>
                  <p className="text-gray-400">gboko.fullstack@gmail.com</p>
                  <p className="text-gray-400">abdulbasetbappy@hotmail.com</p>
                </div>
              </div>
            </div>

            {/* <!-- Social Icons --> */}
            <div className="mt-6 flex justify-center lg:justify-start gap-4">
              <a
                href="#"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-neutral-200 hover:w-32 transition-all overflow-hidden"
              >
                <span className="hidden group-hover:inline whitespace-nowrap mr-2">
                  GitHub
                </span>
                🐙
              </a>
              <a
                href="#"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-900 text-neutral-200 hover:w-36 transition-all overflow-hidden"
              >
                <span className="hidden group-hover:inline whitespace-nowrap mr-2">
                  LinkedIn
                </span>
                💼
              </a>
              <a
                href="#"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-neutral-200 hover:w-36 transition-all overflow-hidden"
              >
                <span className="hidden group-hover:inline whitespace-nowrap mr-2">
                  Facebook
                </span>
                📘
              </a>
              <a
                href="#"
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-800 text-neutral-200 hover:w-36 transition-all overflow-hidden"
              >
                <span className="hidden group-hover:inline whitespace-nowrap mr-2">
                  YouTube
                </span>
                ▶️
              </a>
            </div>
          </div>

          {/* <!-- Right Side: Contact Form --> */}
          <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
            <form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Nom</label>
                <input
                  type="text"
                  placeholder="ex. AZOUM"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Email <span className="text-xs">*</span>
                </label>
                <input
                  type="email"
                  placeholder="azoum@gmail.com"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Téléphone</label>
                <input
                  type="tel"
                  placeholder="N° de Téléphone"
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Message<span className="text-xl text-red-700"> *</span>
                </label>
                <textarea
                  placeholder="Écrire un message..."
                  className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 outline-none h-24"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-gray-900 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
              >
                ENVOYER
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

