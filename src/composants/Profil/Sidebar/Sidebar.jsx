
import { GiBank, GiFilmProjector } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import {
  HiChatAlt2,
  HiOutlineLogout,
  HiUser,
  HiCalendar,
  HiAcademicCap,
} from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";

const menuItems = [
  { label: "Chat", icon: HiChatAlt2 },
  { label: "Validation", icon: FcApproval },
  { label: "Cursus", icon: HiAcademicCap },
  { label: "Profil", icon: HiUser },
  { label: "Projets", icon: GiFilmProjector },
  { label: "dashboard", icon: MdOutlineDashboard},
  { label: "Evènement", icon: HiCalendar },
  { label: "Cotisation", icon: GiBank },
  { label: "Déconnexion", icon: HiOutlineLogout },
];

const Sidebar = ({ setActiveComp, activeComp }) => {
  return (
    <aside className="w-40 md:w-64 md:h-full min-h-screen bg-gray-800 md:text-white flex flex-col ">
      <div className="md:p-4 md:text-xl font-serif border-b border-gray-700">
        Mon espace membre
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-3 p-4 mt-5 h-full">
          {menuItems.map(({ label, icon: Icon }) => (
            <li key={label}>
              <a
                onClick={() => {
                  if (label === "Déconnexion") {
                    localStorage.setItem("cancelLogoutRedirect", "/profile");
                  }
                  setActiveComp(label);
                }}
                className={`flex items-center  gap-3 md:px-4 py-2 rounded hover:bg-gray-700 transition cursor-pointer
                   ${
                     activeComp === label
                       ? "bg-blue-700/80 font-serif font-bold "
                       : "bg-slate-600/90 font-sans font-normal"
                   }`}
              >
                <Icon className="w-5 h-5 " />
                <span className="uppercase">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
