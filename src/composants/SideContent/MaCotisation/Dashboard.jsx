"use client";
import { useEffect } from "react";
// import Image from "next/image";
import {
  MdDashboard,
  MdKeyboardDoubleArrowRight,
  MdOutlineFaceUnlock,
  MdOutlineFileCopy,
  MdOutlineTune,
  MdPowerSettingsNew,
} from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export default function Dashboard() {
  useEffect(() => {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.querySelector(".overlay");

    const toggleMobileMenu = () => {
      sidebar.classList.toggle("translate-x-0");
      overlay.classList.toggle("hidden");
      setTimeout(() => overlay.classList.toggle("opacity-0"), 0);
      document.body.style.overflow = sidebar.classList.contains("translate-x-0")
        ? "hidden"
        : "";
    };

    mobileMenuButton?.addEventListener("click", toggleMobileMenu);
    overlay?.addEventListener("click", toggleMobileMenu);

    const handleResize = () => {
      if (
        window.innerWidth >= 1024 &&
        sidebar.classList.contains("translate-x-0")
      ) {
        toggleMobileMenu();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mobileMenuButton?.removeEventListener("click", toggleMobileMenu);
      overlay?.removeEventListener("click", toggleMobileMenu);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
            <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
              search
            </span>
            <span className="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">
              notifications
            </span>
            <img
              className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover"
              src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg"
              alt="Profile"
              width={40}
              height={40}
            />
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-7xl mx-auto flex">
        <aside className="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4">
            {[
              { icon: <MdDashboard />, label: "Home" , link: "/accueil"},
              { icon: <MdOutlineTune />, label: "Some menu item" , link: "/accueil" },
              { icon: <MdOutlineFileCopy />, label: "Another menu item", link: "/accueil" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <span className="material-icons-outlined mr-2">
                  {item.icon}
                </span>
                {item.label}
                <span className="material-icons-outlined ml-auto">
                  <MdKeyboardDoubleArrowRight />
                </span>
              </a>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4">
            {[
              { icon: <MdOutlineFaceUnlock />, label: "Profile" , link: "/profile"},
              { icon: <IoSettingsOutline />, label: "Settings", link: "/accueil" },
              { icon: <MdPowerSettingsNew />, label: "Log out", link: "/logout" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.link}
                className="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1"
              >
                <span className="material-icons-outlined mr-2">
                  {item.icon}
                </span>
                {item.label}
                <span className="material-icons-outlined ml-auto">
                  <MdKeyboardDoubleArrowRight />
                </span>
              </a>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-4">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-2xl text-blue-900">
                Bienvenue sur le compte <br />
                <strong>AEEY</strong>
              </h2>
              <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
                01:51
              </span>
            </div>
            <div className="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
              <h2 className="text-4xl md:text-5xl text-blue-900">
                Inbox <br />
                <strong>23</strong>
              </h2>
              <a
                href="#"
                className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105"
              >
                See messages
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up"
                style={{ animationDelay: `${num * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-indigo-800">
                  Stats Card {num}
                </h3>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
