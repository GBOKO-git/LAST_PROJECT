// import { useState } from "react";
// import { Menu, X } from "lucide-react"; 
import { EspaceDonateur } from "../composants/EspaceDonateur/Espace";
// import { Link } from "react-router-dom";

const Espacedonateur = () => {
//   const [ isOpen, setIsOpen ] = useState(false)
  return (
    <>
      <div className="min-h-screen grid md:grid-cols-4 items-center justify-center ">
        {/* Menu latéral */}
        {/* <div className="md:hidden max-sm:blok absolute top-24 z-50">
          <button
          onClick={() => setIsOpen(!isOpen)}>
            {isOpen ?
            (<X/>):(<Menu/>)}
          </button>
        </div> */}

        {/* {isOpen && 
          (<aside className="w-screen h-auto bg-green-700/80 text-white p-6 space-y-6 md:hidden col-span-2">
          <nav className="flex space-x-4">
            <Link href="/donation" className="hover:underline">
              💸 don
            </Link>
            <Link href="/espacedonateur" className="underline font-semibold">
              📊 Suivi
            </Link>
            <Link href="/galerie" className="hover:underline">
              🖼️ galerie
            </Link>
            <Link href="/services" className="hover:underline">
              🛠️ Services
            </Link>
            <Link href="/accueil" className="hover:underline">
              🏠 accueil
            </Link>
          </nav>
        </aside>)} */}

        {/* <aside className="w-64 h-full bg-green-700/80 text-white p-6 space-y-6 hidden md:block col-span-1">
          <h2 className="text-2xl font-bold mb-8">Espace Donateur</h2>
          <nav className="flex flex-col space-y-4">
            <Link href="/donation" className="hover:underline">
              💸 Faire un don
            </Link>
            <Link href="/espacedonateur" className="underline font-semibold">
              📊 Suivi des dons
            </Link>
            <Link href="/galerie" className="hover:underline">
              🖼️ Voir la galerie
            </Link>
            <Link href="/services" className="hover:underline">
              🛠️ Services
            </Link>
            <Link href="/accueil" className="hover:underline">
              🏠 Retour à l’accueil
            </Link>
          </nav>
        </aside> */}
        <div className="col-span-3 r">
          <EspaceDonateur />
        </div>
      </div>
    </>
  );
};
export default Espacedonateur;