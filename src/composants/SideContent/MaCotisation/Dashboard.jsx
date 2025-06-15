// // import useStats from "@/hooks/useStats";
// // import useAdminStats from "@/hooks/useAdminStats";
// import {
//   MdDashboard,
//   MdKeyboardDoubleArrowRight,
//   MdOutlineFaceUnlock,
//   MdOutlineFileCopy,
//   MdOutlineTune,
//   MdPowerSettingsNew,
// } from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
// import useStats from "../../../hooks/useStats";
// import { useAdminStats } from "../../../hooks/useAdminStats";
// import Loading from "../../Loading/LoadingButton";
// import { useState } from "react";
// import { Deconnexion } from "../Déconnexion/Deconnexion";
// import UploadImage from "../../UploadImage/Upload";
// import { API_CONFIG, buildApiUrl, getDefaultHeaders } from "../../../services/api.config";
// // import Loading from "../Loading/loadingButton";

// export default function AdminDashboard() {
//   const [showModal, setShowModal] = useState(false);
//     const [photo, setPhoto] = useState("https://i.pravatar.cc/300");

//   useStats();
//   const { stats, loading } = useAdminStats();

//   const cards = [
//     {
//       title: " Les Membres ",
//       value: stats?.members || 0,
//       color: "indigo",
//     },
//     {
//       title: "Personnes inscrites  ",
//       value: stats?.users || 0,
//       color: "yellow",
//     },
//     {
//       title: "Total des dons",
//       value: stats?.totalDon || 0,
//       color: "green",
//     },
//     {
//       title: "Cotisations",
//       value: stats?.totalCotisation || 0,
//       color: "blue",
//     },
//     {
//       title: "Événements",
//       value: stats?.events || 0,
//       color: "purple",
//     },
//     {
//       title: "Dépenses",
//       value: stats?.totalDepense || 0,
//       color: "red",
//     },
//   ];
//   const handleUploadComplete = async (url) => {
//       setPhoto(url);
  
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//           method: "PUT",
//           headers: getDefaultHeaders(token),
//           body: JSON.stringify({ photo: url }),
//         });
//         if (res.status === 200) {
//           console.log("Image de profil mise à jour avec succès");
//         } else {
//           console.warn("Erreur lors de la mise à jour de l'image de profil");
//         }
//       } catch (error) {
//         console.error(
//           "Erreur lors de la sauvegarde de l'image au backend:",
//           error
//         );
//       }
//     };

//   return (
//     <div className="bg-indigo-50 min-h-screen md:w-screen overflow-x-hidden mt-16">
//       <div className="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div>

//       <header className="fixed w-full bg-white text-indigo-800 z-40 shadow-lg animate-slide-down">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
//           <button className="mobile-menu-button p-2 lg:hidden">
//             <span className="material-icons-outlined text-2xl">menu</span>
//           </button>
//           <div className="text-xl font-bold text-blue-900">
//             Admin<span className="text-indigo-800">Panel</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UploadImage
//             onUploadComplete={handleUploadComplete}
//             initialImage={photo}
//              />
//             <i>A.E.E.Y</i>
//           </div>
//         </div>
//       </header>

//       <div className="pt-16 max-w-7xl mx-auto flex">
//         <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
//           <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
//             {[
//               { icon: <MdDashboard />, label: "Home", link: "/" },
//               {
//                 icon: <MdOutlineTune />,
//                 label: "Configuration",
//                 link: "/validateMembers",
//               },
//               {
//                 icon: <MdOutlineFileCopy />,
//                 label: "Evenement",
//                 link: "/addeventform",
//               },
//               {
//                 icon: <MdOutlineFileCopy />,
//                 label: "Cotisation",
//                 link: "/don",
//               },
//             ].map((item) => (
//               <a
//                 key={item.label}
//                 href={item.link}
//                 className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//                 <span className="ml-auto">
//                   <MdKeyboardDoubleArrowRight />
//                 </span>
//               </a>
//             ))}
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-4">
//             {/* {[
//               { icon: <MdOutlineFaceUnlock />, label: "Profil", link: "/profile" },
//               { icon: <IoSettingsOutline />, label: "Paramètres", link: "/editprofile" },
//               { icon: <MdPowerSettingsNew />, label: "Déconnexion", onClick: () => setShowModal(true) },
//             ].map((item) => (
//               <a
//                 key={item.label}
//                 href={item.link}
//                 className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//                 <span className="ml-auto">
//                   <MdKeyboardDoubleArrowRight />
//                 </span>
//               </a>
//             ))} */}

//             {[
//               {
//                 icon: <MdOutlineFaceUnlock />,
//                 label: "Profil",
//                 link: "/profile",
//               },
//               {
//                 icon: <IoSettingsOutline />,
//                 label: "Paramètres",
//                 link: "/editprofile",
//               },
//               {
//                 icon: <MdPowerSettingsNew />,
//                 label: "Déconnexion",
//                 onClick: () => setShowModal(true),
//               },
//             ].map((item) =>
//               item.link ? (
//                 <a
//                   key={item.label}
//                   href={item.link}
//                   className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   {item.label}
//                   <span className="ml-auto">
//                     <MdKeyboardDoubleArrowRight />
//                   </span>
//                 </a>
//               ) : (
//                 <button
//                   key={item.label}
//                   onClick={item.onClick}
//                   className="w-full text-left flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   {item.label}
//                   <span className="ml-auto">
//                     <MdKeyboardDoubleArrowRight />
//                   </span>
//                 </button>
//               )
//             )}
//           </div>
//         </aside>

//         <main className="flex-1 p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {showModal && <Deconnexion onClose={() => setShowModal(false)} />}
//             {loading ? (
//               <div className="col-span-3 text-center text-gray-600">
//                 <Loading />
//               </div>
//             ) : (
//               cards.map((card, i) => (
//                 <div
//                   key={card.title}
//                   className={`bg-${card.color}-100 border border-${card.color}-200 rounded-xl p-6 h-44 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up`}
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 >
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {card.title}
//                   </h3>
//                   <p className="text-4xl text-${card.color}-800 font-semibold mt-4">
//                     {card.value}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


// import {
//   MdDashboard,
//   MdKeyboardDoubleArrowRight,
//   MdOutlineFaceUnlock,
//   MdOutlineFileCopy,
//   MdOutlineTune,
//   MdPowerSettingsNew,
// } from "react-icons/md";
// import { IoSettingsOutline } from "react-icons/io5";
// import useStats from "../../../hooks/useStats";
// import { useAdminStats } from "../../../hooks/useAdminStats";
// import Loading from "../../Loading/LoadingButton";
// import { useState } from "react";
// import { Deconnexion } from "../Déconnexion/Deconnexion";
// import UploadImage from "../../UploadImage/Upload";
// import { useEffect } from "react";

// import {
//   API_CONFIG,
//   buildApiUrl,
//   getDefaultHeaders,
// } from "../../../services/api.config";
// // import { authService } from "../../../services/authService";

// export default function AdminDashboard() {
//   const [showModal, setShowModal] = useState(false);
//   const [photo, setPhoto] = useState("https://i.pravatar.cc/300");

//   useStats();
//   const { stats, loading } = useAdminStats();

//   const cards = [
//     {
//       title: " Les Membres ",
//       value: stats?.members || 0,
//       color: "indigo",
//     },
//     {
//       title: "Personnes inscrites  ",
//       value: stats?.users || 0,
//       color: "yellow",
//     },
//     {
//       title: "Total des dons",
//       value: stats?.totalDon || 0,
//       color: "green",
//     },
//     {
//       title: "Cotisations",
//       value: stats?.totalCotisation || 0,
//       color: "blue",
//     },
//     {
//       title: "Événements",
//       value: stats?.events || 0,
//       color: "purple",
//     },
//     {
//       title: "Dépenses",
//       value: stats?.totalDepense || 0,
//       color: "red",
//     },
//   ];


//     useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//           headers: getDefaultHeaders(token),
//         });
//         const data = await res.json();
//         setPhoto(data?.user.photo); // Chargement de l’image depuis la BDD
//       } catch (err) {
//         console.error("Erreur lors du chargement du profil :", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//    const handleUploadComplete = async (url) => {
//     setPhoto(url);

//     try {
//       const token = localStorage.getItem("token");
//       const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
//         method: "PUT",
//         headers: getDefaultHeaders(token),
//         body: JSON.stringify({ photo: url }),
//       });
//       if (res.status === 200) {
//         console.log("Image de profil mise à jour avec succès");
//       } else {
//         console.warn("Erreur lors de la mise à jour de l'image de profil");
//       }
//     } catch (error) {
//       console.error(
//         "Erreur lors de la sauvegarde de l'image au backend:",
//         error
//       );
//     }
//   };

//   return (
//     <div className="bg-indigo-50 min-h-screen md:w-screen overflow-x-hidden mt-16">
//       <header className="fixed w-full bg-white text-indigo-800 z-40 shadow-lg animate-slide-down">
//         <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
//           <button className="mobile-menu-button p-2 lg:hidden">
//             <span className="material-icons-outlined text-2xl">menu</span>
//           </button>
//           <div className="text-xl font-bold text-blue-900">
//             Admin<span className="text-indigo-800">Panel </span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UploadImage
//               onUploadComplete={handleUploadComplete}
//               initialImage={photo}
//             />
//             <i>A.E.E.Y</i>
//           </div>
//         </div>
//       </header>

//       <div className="pt-16 max-w-7xl mx-auto flex">
//         <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
//           <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
//             {[
//               { icon: <MdDashboard />, label: "Home", link: "/" },
//               {
//                 icon: <MdOutlineTune />,
//                 label: "Configuration",
//                 link: "/validateMembers",
//               },
//               {
//                 icon: <MdOutlineFileCopy />,
//                 label: "Evenement",
//                 link: "/addeventform",
//               },
//               {
//                 icon: <MdOutlineFileCopy />,
//                 label: "Cotisation",
//                 link: "/don",
//               },
//             ].map((item) => (
//               <a
//                 key={item.label}
//                 href={item.link}
//                 className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//               >
//                 <span className="mr-2">{item.icon}</span>
//                 {item.label}
//                 <span className="ml-auto">
//                   <MdKeyboardDoubleArrowRight />
//                 </span>
//               </a>
//             ))}
//           </div>

//           <div className="bg-white rounded-xl shadow-lg p-4">
//             {[
//               {
//                 icon: <MdOutlineFaceUnlock />,
//                 label: "Profil",
//                 link: "/profile",
//               },
//               {
//                 icon: <IoSettingsOutline />,
//                 label: "Paramètres",
//                 link: "/editprofile",
//               },
//               {
//                 icon: <MdPowerSettingsNew />,
//                 label: "Déconnexion",
//                 onClick: () => setShowModal(true),
//               },
//             ].map((item) =>
//               item.link ? (
//                 <a
//                   key={item.label}
//                   href={item.link}
//                   className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   {item.label}
//                   <span className="ml-auto">
//                     <MdKeyboardDoubleArrowRight />
//                   </span>
//                 </a>
//               ) : (
//                 <button
//                   key={item.label}
//                   onClick={item.onClick}
//                   className="w-full text-left flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
//                 >
//                   <span className="mr-2">{item.icon}</span>
//                   {item.label}
//                   <span className="ml-auto">
//                     <MdKeyboardDoubleArrowRight />
//                   </span>
//                 </button>
//               )
//             )}
//           </div>
//         </aside>

//         <main className="flex-1 p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {showModal && <Deconnexion onClose={() => setShowModal(false)} />}
//             {loading ? (
//               <div className="col-span-3 text-center text-gray-600">
//                 <Loading />
//               </div>
//             ) : (
//               cards.map((card, i) => (
//                 <div
//                   key={card.title}
//                   className={`bg-${card.color}-100 border border-${card.color}-200 rounded-xl p-6 h-44 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up`}
//                   style={{ animationDelay: `${i * 0.1}s` }}
//                 >
//                   <h3 className="text-xl font-bold text-gray-800">
//                     {card.title}
//                   </h3>
//                   <p className={`text-4xl text-${card.color}-800 font-semibold mt-4`}>
//                     {card.value}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import {
  MdDashboard,
  MdKeyboardDoubleArrowRight,
  MdOutlineFaceUnlock,
  MdOutlineFileCopy,
  MdOutlineTune,
  MdPowerSettingsNew,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import useStats from "../../../hooks/useStats";
import { useAdminStats } from "../../../hooks/useAdminStats";
import Loading from "../../Loading/LoadingButton";
import { useState, useEffect } from "react";
import { Deconnexion } from "../Déconnexion/Deconnexion";
import UploadImage from "../../UploadImage/Upload";

import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
} from "../../../services/api.config";
import { authService } from "../../../services/authService";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState();

  useStats();
  const { stats, loading } = useAdminStats();

  // Mapping statique des couleurs pour Tailwind
  const colorClasses = {
    indigo: "bg-indigo-100 border-indigo-200 text-indigo-800",
    yellow: "bg-yellow-100 border-yellow-200 text-yellow-800",
    green: "bg-green-100 border-green-200 text-green-800",
    blue: "bg-blue-100 border-blue-200 text-blue-800",
    purple: "bg-purple-100 border-purple-200 text-purple-800",
    red: "bg-red-100 border-red-200 text-red-800",
  };

  const cards = [
    {
      title: " Les Membres ",
      value: stats?.members || 0,
      color: "indigo",
    },
    {
      title: "Personnes inscrites  ",
      value: stats?.users || 0,
      color: "yellow",
    },
    {
      title: "Total des dons",
      value: stats?.totalDon || 0,
      color: "green",
    },
    {
      title: "Cotisations",
      value: stats?.totalCotisation || 0,
      color: "blue",
    },
    {
      title: "Événements",
      value: stats?.events || 0,
      color: "purple",
    },
    {
      title: "Dépenses",
      value: stats?.totalDepense || 0,
      color: "red",
    },
  ];

 useEffect(() => {
  const fetchProfile = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if (userData) {
        setUser(userData);
        setPhoto(userData?.photo && userData.photo !== "" ? userData.photo : "https://i.pravatar.cc/300");
      }
    } catch (err) {
      console.error("Erreur lors du chargement du profil :", err);
    }
  };

  fetchProfile();
}, []);


  const handleUploadComplete = async (url) => {
    setPhoto(url);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PHOTO), {
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
      console.error("Erreur lors de la sauvegarde de l'image au backend:", error);
    }
  };

  return (
    <div className="bg-indigo-50 min-h-screen md:w-screen overflow-x-hidden mt-16">
      <header className="fixed w-full bg-white text-indigo-800 z-40 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          <button className="mobile-menu-button p-2 lg:hidden">
            <span className="material-icons-outlined text-2xl">menu</span>
          </button>
          <div className="text-xl font-bold text-blue-900">
            Admin<span className="text-indigo-800">Panel </span>
          </div>
          <div className="flex items-center space-x-2">
            {user ? <UploadImage onUploadComplete={handleUploadComplete} initialImage={photo} /> : <img src="https://i.pravatar.cc/300"/> }
            
            <i>A.E.E.Y</i>
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-7xl mx-auto flex">
        <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
            {[
              { icon: <MdDashboard />, label: "Home", link: "/" },
              {
                icon: <MdOutlineTune />,
                label: "Configuration",
                link: "/validateMembers",
              },
              {
                icon: <MdOutlineFileCopy />,
                label: "Evenement",
                link: "/addeventform",
              },
              {
                icon: <MdOutlineFileCopy />,
                label: "Cotisation",
                link: "/don",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
                <span className="ml-auto">
                  <MdKeyboardDoubleArrowRight />
                </span>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            {[
              {
                icon: <MdOutlineFaceUnlock />,
                label: "Profil",
                link: "/profile",
              },
              {
                icon: <IoSettingsOutline />,
                label: "Paramètres",
                link: "/editprofile",
              },
              {
                icon: <MdPowerSettingsNew />,
                label: "Déconnexion",
                onClick: () => setShowModal(true),
              },
            ].map((item) =>
              item.link ? (
                <a
                  key={item.label}
                  href={item.link}
                  className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  <span className="ml-auto">
                    <MdKeyboardDoubleArrowRight />
                  </span>
                </a>
              ) : (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className="w-full text-left flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                  <span className="ml-auto">
                    <MdKeyboardDoubleArrowRight />
                  </span>
                </button>
              )
            )}
          </div>
        </aside>

        <main className="flex-1 p-4 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {showModal && <Deconnexion onClose={() => setShowModal(false)} />}
            {loading ? (
              <div className="col-span-3 text-center text-gray-600">
                <Loading />
              </div>
            ) : (
              cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`rounded-xl p-6 h-44 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up ${colorClasses[card.color]}`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                  <p className="text-4xl font-semibold mt-4">{card.value}</p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
