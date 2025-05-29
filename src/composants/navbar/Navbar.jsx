import { Link } from "react-router-dom";
import reactLogo from "../../assets/react.svg";

export const Navbar = () => {
  return (
    <>
      <div className="w-full px-4 py-2 bg-gray-100">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src={reactLogo} alt="LOGO" className="w-8 h-8" />
            <Link to="/" className="text-xl font-bold text-blue-600 hover:text-blue-800">AEEY</Link>
          </div>
          <div>
            <nav className="flex space-x-4">
              <Link to="/connexion" className="px-3 py-2 rounded-md hover:bg-gray-200">Connexion</Link>
              <Link to="/profile" className="px-3 py-2 rounded-md hover:bg-gray-200">PROFIL</Link>
              <Link to="/membre" className="px-3 py-2 rounded-md hover:bg-gray-200">MEMBRE</Link>
              <Link to="/don" className="px-3 py-2 rounded-md hover:bg-gray-200">DON</Link>
              <Link to="/evenement" className="px-3 py-2 rounded-md hover:bg-gray-200">EVENEMENT</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};
