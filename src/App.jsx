import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Navbar } from "./composants/navbar/Navbar";
import { Profile } from "./pages/Profile";
import { Evenement } from "./pages/Evenement";
import { Accueil } from "./pages/Accueil";
import { Don } from "./pages/Don";
import { Membre } from "./pages/Membre";
import { Connexion } from "./pages/Connexion";
import { Inscription } from "./pages/Inscription";
import { ProfilRestreint } from "./pages/ProfilRestreint";
import { DashboardPage } from "./pages/Dashboard";
import { ValidateMembers } from "./pages/validateMembers";
import AuthGuard from "./components/auth/AuthGuard";
import { AddEventForm } from "./pages/AddEventForm";
import { MonEspaceDonateur } from "./pages/MonEspaceDonateur";
import { EditProfile } from "./pages/EditProfile";
import { MembershipRequestPage } from "./pages/Memberrequest";
// import { MonEspaceDonateur } from "./pages/MonEspaceDonateur";

const routerConfig = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  },
};

function App() {
  return (
    <>
      <Router {...routerConfig}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route
            path="/profile/*"
            element={
              <AuthGuard>
                <Profile />
              </AuthGuard>
            }
          />
          <Route path="/don" element={<Don />} />
          <Route
            path="/dashboard"
            element={
              <AuthGuard requiredRole="admin">
                <DashboardPage />
              </AuthGuard>
            }
          />
          <Route
            path="/evenement"
            element={
              <AuthGuard>
                <Evenement />
              </AuthGuard>
            }
          />
          <Route
            path="/membre"
            element={
              <AuthGuard>
                <Membre />
              </AuthGuard>
            }
          />
          <Route
            path="/profilRestreint"
            element={
              <AuthGuard>
                <ProfilRestreint />
              </AuthGuard>
            }
          />
          <Route
            path="/validateMembers"
            element={
              <AuthGuard requiredRole="admin">
                <ValidateMembers />
              </AuthGuard>
            }
          />
          <Route
            path="/espacedonateur"
            element={
              <AuthGuard>
                <MonEspaceDonateur />
              </AuthGuard>
            }
          />
          <Route
            path="/addeventform"
            element={
              <AuthGuard>
                <AddEventForm />
              </AuthGuard>
            }
          />
          <Route 
          path="/editprofile"
          element = { <EditProfile/> }
          />
          <Route 
          path="/demandemembre"
          element = { <MembershipRequestPage/> }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
