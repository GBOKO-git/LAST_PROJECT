import ValidateMembers from "@/components/admin/validateMembers/ValidateMember";
// import ValidateMembers from "@/components/Admin/validateMembers";
import Chat from "@/components/Chat/Chat";
import Deconnexion from "@/components/Déconnexion/Deconnexion";
// import Loading from "@/components/Loading/loadingButton";
// import Dashboard from "@/components/MaCotisation/Dashboard";
import MaCotisation from "@/components/MaCotisation/MaCotisation";
import MesEvenements from "@/components/MesEvenements/MesEvenements";
import MesProjets from "@/components/MesProjets/MesProjets";
import MonCursus from "@/components/MonCursus/MonCursus";
import MonProfile from "@/components/MonProfile/MonProfile";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useAuthGuard } from "@/hooks/useAuthCard";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const MemberProfil = () => {
  const [activeComp, setActiveComp] = useState("Profile");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useAuthGuard();

 
  useEffect(() => {
    if (activeComp === "dashboard") {
      router.push("/dashboard");
    }
  }, [activeComp]);
  
  const sidebarContent = () => {
    switch (activeComp) {
      case "Profil":
        return <MonProfile />;

        case "Validation":
        return <ValidateMembers />;

      case "Cursus":
        return <MonCursus />;

      case "Cotisation":
        return <MaCotisation />;

      case "Chat":
        return <Chat />;

      case "Projets":
        return <MesProjets />;

      case "Evènement":
        return <MesEvenements />;

      case "Déconnexion":
        return <Deconnexion />;

      default:
        return <MonProfile />;
    }
  };

  
  return (
    <div className="relative flex flex-col md:flex-row mt-2 md:mt-16 min-h-screen ">
      {/* Menu hamburger mobile */}
      <div
      className="md:hidden  grid p-4  justify-between items-center bg-slate-400 shadow-md">
        <button
        
          className="fixed focus:outline-none size-10 dark:text-white top-16 z-50  text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6 " /> : <Menu className="w-6 h-6 " />}
        </button>
      </div>

      {/* Sidebar Mobile */}
      {isOpen && (
        <div className="md:hidden fixed h-full z-40 mt-7">
          <Sidebar setActiveComp={setActiveComp} activeComp={activeComp} />
        </div>
      )}

      <div className="hidden md:block">
        <Sidebar setActiveComp={setActiveComp} activeComp={activeComp} />
      </div>
      <main className="grid justify-center md:items-center  w-full  overflow-x-hidden">
        {sidebarContent()}
      </main>
    </div>
  );
};

e