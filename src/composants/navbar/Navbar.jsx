import { useState } from "react";
import { Link } from "react-router-dom";
// import reactLogo from "../../assets/react.svg";
// public/images/membres/logo.jpeg
export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };  


  return (
    <>
      <div className="w-full px-4 py-2 bg-gray-100 fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/membres/logo.jpeg" alt="LOGO" className="w-8 h-8 rounded-full" />
            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">AEEY</Link>
          </div>
          <div>
            <nav className="md:flex space-x-4 hidden ">
              <Link to="/connexion" className="px-3 py-2 rounded-md hover:bg-gray-200">Connexion</Link>
              <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-gray-200">PROFIL</Link>
              <Link to="/membre" className="px-3 py-2 rounded-md hover:bg-gray-200">MEMBRE</Link>
              <Link to="/don" className="px-3 py-2 rounded-md hover:bg-gray-200">DON</Link>
              <Link to="/evenement" className="px-3 py-2 rounded-md hover:bg-gray-200">EVENEMENT</Link>
            </nav>
            <button onClick={toggleMobileMenu} className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              </button>
              {isMobileMenuOpen && (
                <div className="absolute top-12 left-0 w-full h-screen bg-white shadow-lg rounded-lg md:hidden">
                  <nav className="flex flex-col gap-2 p-4 w-48">
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/connexion" className="px-3 py-2 rounded-md hover:bg-gray-200">Connexion</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/profile" className="px-3 py-2 rounded-md hover:bg-gray-200">PROFIL</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/membre" className="px-3 py-2 rounded-md hover:bg-gray-200">MEMBRE</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/don" className="px-3 py-2 rounded-md hover:bg-gray-200">DON</Link>
                    <Link onClick={() => setIsMobileMenuOpen(false)} to="/evenement" className="px-3 py-2 rounded-md hover:bg-gray-200">EVENEMENT</Link>
                  </nav>
                </div>
              )}
            </div>
        </div>
      </div>
    </>
  );
};
