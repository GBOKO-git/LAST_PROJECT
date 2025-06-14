import { useEffect, useState } from "react";
import { authService } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/LoadingButton";
import UploadImage from "../../UploadImage/Upload";
import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
} from "../../../services/api.config";

export const InviteProfil = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState("https://i.pravatar.cc/300");
  const navigate = useNavigate();

  useEffect(() => {
    const getProfil = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
          setPhoto(userData.photo || photo); // Si user a une photo
        }
      } catch (error) {
        setError(error.message || "chargement impossible!");
      } finally {
        setLoading(false);
      }
    };
    getProfil();
  }, []);

  const handleDisconnect = () => {
    authService.logout();
    navigate("/connexion");
  };

  const handleUploadComplete = async (url) => {
    setPhoto(url);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "PUT",
        headers: getDefaultHeaders(token),
        body: JSON.stringify({ photo: url }),
      });
      if (res.status === 200) {
        console.log("Image de profil mise à jour avec succès");
      } else {
        console.warn("Erreur lors de la mise à jour de l'image de profil");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la sauvegarde de l'image au backend:",
        error
      );
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Erreur lors du chargement des données !</p>;

  return (
    <div className=" min-h-screen flex items-center justify-center p-4 mt-12">
      <div className="bg-white w dark:bg-gray-800 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden transition-all duration-300 hover:shadow-indigo-500/50 dark:hover:shadow-blue-900/50">
        <div className="relative h-32">
          <UploadImage
            onUploadComplete={handleUploadComplete}
            initialImage={photo}
          />
        </div>
        <div className="pt-7 pb-6 px-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            {user.nom} {" "} {user.prenom}
          </h1>
          
          <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-4">
            {user.job}
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {user.role === "user" ? <p> Utilisateur </p>  : <p>Donateur</p> }
          </p>
          {/* Reste du contenu... */}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-indigo-800 dark:text-gray-300 dark:hover:text-indigo-400 transition-colors duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 grid text-center space-y-4">
              <span
                onClick={() => navigate("/don")}
                className="py-2  w-full  text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
              >
                Faire un don
              </span>
              <span
                onClick={() => navigate("/demandemembre")}
                className="py-2  w-full  text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
              >
                Demenade menbre
              </span>
              <span
                onClick={() => navigate("/editprofile")}
                className="py-2  w-full  text-md uppercase bg-indigo-100 text-indigo-800 rounded-lg transition-colors duration-300 hover:bg-indigo-800 hover:text-white dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-700"
              >
                Paramètre du compte
              </span>

          </div>
        {/* Bouton de déconnexion */}
        <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
          <button
            onClick={handleDisconnect}
            className="w-full bg-red-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-900 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Deconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

// import { useEffect, useState } from "react";
// import { authService } from "../../../services/authService";
// import { useNavigate } from "react-router-dom";
// import Loading from "../../Loading/LoadingButton";
// import UploadImage from "../../UploadImage/Upload";
// import {
//   API_CONFIG,
//   buildApiUrl,
//   getDefaultHeaders,
// } from "../../../services/api.config";

// export const InviteProfil = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Chargement des données utilisateur
//   useEffect(() => {
//     async function fetchUser() {
//       try {
//         setLoading(true);
//         const currentUser = await authService.getCurrentUser();
//         if (!currentUser) {
//           navigate("/login");
//           return;
//         }
//         setUser(currentUser);
//       } catch (err) {
//         setError("Erreur lors du chargement du profil");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchUser();
//   }, [navigate]);

//   // Déconnexion
//   const handleLogout = () => {
//     authService.logout();
//     navigate("/login");
//   };

//   // Mise à jour photo profil
//   const handleUploadComplete = async (url) => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//         method: "PUT",
//         headers: getDefaultHeaders(token),
//         body: JSON.stringify({ photo: url }),
//       });

//       if (res.status === 200) {
//         console.log("Image de profil mise à jour avec succès");
//         // Met à jour l'état utilisateur localement
//         setUser((prevUser) => ({
//           ...prevUser,
//           photo: url,
//         }));
//       } else {
//         console.warn("Erreur lors de la mise à jour de l'image de profil");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la sauvegarde de l'image au backend:", error);
//     }
//   };

//   if (loading) return <Loading />;

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-red-500 text-lg">{error}</p>
//       </div>
//     );

//   if (!user) return null;

//   return (
//     <div className="font-sans antialiased text-gray-900 leading-normal tracking-wider bg-cover min-h-screen bg-[url('images/aeey.jpeg')]">
//       <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
//         <div
//           id="profile"
//           className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-95 mx-6 lg:mx-0"
//         >
//           <div className="p-6 md:p-12 text-center lg:text-left">
//             {/* Photo profil mobile */}
//             <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-20 h-48 w-48 bg-cover bg-center relative">
//               <img
//                 src={user.photo || "https://i.pravatar.cc/300"}
//                 alt={`${user.firstName} ${user.lastName}`}
//                 className="rounded-full h-48 w-48 object-cover"
//               />
//               <div className="absolute bottom-0 right-0">
//                 <UploadImage
//                   onUploadComplete={handleUploadComplete}
//                   initialImage={user.photo}
//                 />
//               </div>
//             </div>

//             <h1 className="text-4xl font-bold pt-8 lg:pt-0">
//               {user.firstName} {user.lastName}
//             </h1>
//             <p className="text-green-700 text-xl font-semibold">
//               {user.job || "Profession non renseignée"}
//             </p>

//             <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>

//             {/* Photo profil desktop */}
//             <div className="hidden lg:block rounded-full shadow-xl h-48 w-48 bg-cover bg-center relative mt-6">
//               <img
//                 src={user.photo || "https://i.pravatar.cc/300"}
//                 alt={`${user.firstName} ${user.lastName}`}
//                 className="rounded-full h-48 w-48 object-cover"
//               />
//               <div className="absolute bottom-0 right-0">
//                 <UploadImage
//                   onUploadComplete={handleUploadComplete}
//                   initialImage={user.photo}
//                 />
//               </div>
//             </div>

//             <p className="pt-4 text-gray-700 text-base max-w-xl mx-auto lg:mx-0">
//               {user.bio || "Description non renseignée."}
//             </p>

//             {/* Boutons navigation */}
//             <div className="pt-12 pb-8 flex flex-col space-y-4 max-w-xs mx-auto lg:mx-0">
//               <button
//                 onClick={() => navigate("/faire-un-don")}
//                 className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
//               >
//                 Faire un don
//               </button>
//               <button
//                 onClick={() => navigate("/demande-membre")}
//                 className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
//               >
//                 Demande membre
//               </button>
//               <button
//                 onClick={() => navigate("/parametres-compte")}
//                 className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
//               >
//                 Paramètres du compte
//               </button>
//             </div>

//             {/* Bouton déconnexion */}
//             <div>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
//               >
//                 Déconnexion
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
