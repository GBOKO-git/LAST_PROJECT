// src/components/EspaceDonateur/HistoriqueDonsSection.jsx
import React from 'react';

export const HistoriqueDonsSection = ({ dons }) => {
  if (!dons || dons.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4">Historique des dons</h2>
        <p className="text-center text-gray-600">Vous n'avez pas encore effectué de dons enregistrés.</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Historique des dons</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> {/* Ajustez la grille si besoin */}
        {dons.map((don, index) => (
          <div key={don._id || index} className="bg-gray-100 p-4 rounded shadow">
            <p><strong>Montant :</strong> {don.montant} FCFA</p>
            <p><strong>Date :</strong> {new Date(don.date).toLocaleDateString('fr-FR')}</p>
            <p><strong>Description :</strong> {don.description || 'Non spécifiée'}</p>
            {/* Ajoutez d'autres champs si votre modèle de don les inclut */}
          </div>
        ))}
      </div>
    </section>
  );
};