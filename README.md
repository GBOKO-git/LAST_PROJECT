# 🎓 AEEY — Client Web

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/react-18.2.0-61DAFB?logo=react)](https://reactjs.org)
[![Vite](https://img.shields.io/badge/vite-5.1.6-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/tailwind-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

Frontend officiel de la plateforme **AEEY**, une application web dédiée à la gestion des activités d'une association estudiantine.  
Ce client React consomme l’API REST du backend `aeey_server`.

> 🚧 Certaines fonctionnalités sont encore en cours de développement.

---

## ✨ Fonctionnalités

- ✅ Authentification (inscription / connexion via JWT)
- ✅ Gestion des profils utilisateurs (édition + image)
- ✅ Validation des membres par les administrateurs
- ✅ Dons sécurisés via **PayPal**
- ✅ Notifications Toast pour les interactions
- 🚧 Gestion des cotisations (à venir)
- ✅  Création & gestion d’événements
- ✅  Tableau de bord statistiques administratives

---

## 🛠️ Technologies

- **React 18** + **Vite** — Frontend rapide et moderne
- **Tailwind CSS** — Utilitaires CSS modernes
- **Axios** — Requêtes HTTP avec gestion des tokens
- **React Router DOM** — Navigation SPA
- **Lucide, Heroicons, React Icons** — Bibliothèques d’icônes
- **React Toastify** — Notifications utilisateur
- **JWT Decode** — Décodage local du token JWT
- **PayPal React SDK** — Intégration du paiement

---

## 📦 Installation & Développement

### 1. Cloner le dépôt

git clone https://github.com/tonutilisateur/aeey_client.git
cd aeey_client


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
