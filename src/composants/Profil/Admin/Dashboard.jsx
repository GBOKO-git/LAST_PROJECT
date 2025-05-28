
import {
  MdDashboard,
  MdKeyboardDoubleArrowRight,
  MdOutlineFaceUnlock,
  MdOutlineFileCopy,
  MdOutlineTune,
  MdPowerSettingsNew,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import Loading from "../composants/Loading/LoadingButton";
import useAdminStats from "../hooks/useAdminStats";
import useStats from "../hooks/useStats";

// import Loading from "../Loading/loadingButton";

export const Dashboard = () => {
  useStats();
  const { stats, loading } = useAdminStats();

  const cards = [
    {
      title: "Membres ",
      value: stats?.members || 0,
      color: "indigo",
    },
    {
      title: "Persones inscrites  ",
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

  return (
    <div className="bg-indigo-50 min-h-screen md:w-screen overflow-x-hidden mt-16">
      <div className="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div>

      <header className="fixed w-full bg-white text-indigo-800 z-40 shadow-lg animate-slide-down">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
          <button className="mobile-menu-button p-2 lg:hidden">
            <span className="material-icons-outlined text-2xl">menu</span>
          </button>
          <div className="text-xl font-bold text-blue-900">
            Admin<span className="text-indigo-800">Panel</span>
          </div>
          <div className="flex items-center space-x-2">
            {/* <img
              className="w-10 h-10 rounded-full object-cover"
              src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
              alt="Profile"
            /> */}
            <i>A.E.E.Y</i>
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-7xl mx-auto flex">
        <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
            {[
              { icon: <MdDashboard />, label: "Home", link: "/accueil" },
              { icon: <MdOutlineTune />, label: "Configuration", link: "/validateMembers" },
              { icon: <MdOutlineFileCopy />, label: "Documents", link: "/accueil" },
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
              { icon: <MdOutlineFaceUnlock />, label: "Profil", link: "/profile" },
              { icon: <IoSettingsOutline />, label: "Paramètres", link: "/settings" },
              { icon: <MdPowerSettingsNew />, label: "Déconnexion", link: "/logout" },
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
        </aside>

        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 text-center text-gray-600"><Loading/></div>
            ) : (
              cards.map((card, i) => (
                <div
                  key={card.title}
                  className={`bg-${card.color}-100 border border-${card.color}-200 rounded-xl p-6 h-44 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                  <p className="text-4xl text-${card.color}-800 font-semibold mt-4">
                    {card.value}
                  </p>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}