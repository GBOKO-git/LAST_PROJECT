import { useState } from "react";
// import EditProfile from "./EditProfile";
// import ProjectList from "./ProjectList";
import { MdEmail, MdPhoneIphone } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import Loading from "../../Loading/LoadingButton";
import { useUser } from "../../../hooks/useUser";
import { EditProfile } from "./EditProfile";

const MonProfile = () => {
  const [activeComponent, setActiveComponent] = useState("projectList");
  const { user, loading, error } = useUser();

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "editProfile":
        return (
          <EditProfile
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        );

      case "projectList":
        return (
          <ProjectList
            setActiveComponent={setActiveComponent}
            activeComponent={activeComponent}
          />
        );

      default:
        return null;
    }
  };

  if (loading) return <Loading />;
  if (error) return <p>Erreur: {error}</p>;
  if (!user) return <p>Utilisateur non trouvé</p>;

  return (
    <>
      <div className=" min-h-screen flex items-center justify-center ">
        <div className=" grid md:grid-cols-2 font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl">
          <div className="grid md:flex-row">
            <div className="md:w-1/3 text-center mb-8 md:mb-0">
            {/* "https://i.pravatar.cc/300" */}
              <img
                src={user.image}
                alt="Profile Picture"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 transition-transform duration-300 hover:scale-105 ring ring-gray-300"
              />
              <button
                onClick={() => setActiveComponent("editProfile")}
                className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300 ring ring-gray-300 hover:ring-indigo-300"
              >
                Modifier le profil
              </button>
            </div>
            <div className="md:w-2/3 md:pl-8">
              <h1 className="text-2xl font-bold text-indigo-800 mb-2">
                {user.name}
              </h1>
              <p className="text-gray-600 mb-6">Software Developer</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Informations sur l'organisation{" "}
              </h2>
              <p className="text-gray-700 mb-6">{user.job}</p>

              <h2 className="text-xl font-semibold text-indigo-800 mb-4">
                Coordonnées
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <i className="text-indigo-700">
                    <MdEmail />
                  </i>
                  {user.email}
                </li>
                <li className="flex items-center gap-2">
                  <i className="text-indigo-700 ">
                    <MdPhoneIphone />
                  </i>
                  {user.role}
                </li>
                <li className="flex items-center">
                  <i className="text-indigo-700 ">
                    <IoLocationSharp />
                  </i>
                  San Francisco, CAa
                </li>
              </ul>
            </div>
          </div>
          <div>{renderActiveComponent()}</div>
        </div>
      </div>
    </>
  );
};

export default MonProfile;
