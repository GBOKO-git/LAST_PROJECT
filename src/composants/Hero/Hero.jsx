"use client";
import { SlArrowLeft } from "react-icons/sl";
import { FaUsers, FaUserSecret } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative min-h-screen w-screen box-border  bg-[url('/images/aeey.jpeg')] bg-no-repeat bg-cover bg-start overflow-hidden">
      <section className="relative bg-black/60 z-10 flex items-center justify-center min-h-screen text-center">
        <div className="max-w-3xl px-4">
          <h1 className="sm:text-4xl text-3xl mb-6 font-bold text-yellow-400 drop-shadow-lg">
            🎓 ASSOCIATION DES ÉLÈVES ET ÉTUDIANTS DE YAOKRO
          </h1>
          <div className="bg-white w-auto h-28 grid items-center justify-start fixed left-0 top-1/2 -translate-y-1/2 rounded-r-3xl pr-2 py-1 z-20">
            <Link to="/profile" >
            <div className="bg-green-600 h-11 w-full rounded-r-3xl flex items-center justify-between pr-2 gap-3 hover:bg-green-700 transition-colors">
             <div className="text-white pl-2">
                <SlArrowLeft />
              </div>
              <div>
                <h3 className="hover:text-green-400 font-serif text-white">
                  Espace membre
                </h3>
              </div>
              <div className="bg-green-700 text-white rounded-full size-7 grid items-center justify-center">
                <FaUserSecret />
              </div>
            </div>
             </Link>

             <Link to="/espacedonateur" >
            <div className="bg-green-600 h-11 w-full rounded-r-3xl flex items-center justify-between pr-2 gap-3 hover:bg-green-700 transition-colors">
              <div className="text-white pl-2">
                <SlArrowLeft />
              </div>
              <div>
                <h3  className="hover:text-green-400 font-serif text-white">
                  Espace donateur
                </h3>
              </div>
              <div className="bg-green-700 text-white rounded-full size-7 grid items-center justify-center">
                <FaUsers />
              </div>
            </div>
            </Link>
          </div>

          <p className="mb-8 text-xl text-white font-semibold drop-shadow">
            Bienvenue sur le site officiel de l'AEEY. Unis pour l'excellence, la
            solidarité et l'engagement.
          </p>
          <a
            href="/evenement"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Découvrir les événements
          </a>
        </div>
      </section>
    </div>
  );
}; 