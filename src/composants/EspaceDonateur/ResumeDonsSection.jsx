// src/components/EspaceDonateur/ResumeDonsSection.jsx
import React from 'react';

export const ResumeDonsSection = ({ totalDons, nombreDons }) => {
  return (
    <section className="bg-white shadow rounded p-4 mb-6">
      <h2 className="text-xl font-semibold mb-2">Résumé de mes dons</h2>
      <p>Total donné : <span className="font-bold text-green-600">{totalDons} FCFA</span></p>
      <p>Nombre de dons enregistrés : <span className="font-bold text-yellow-600">{nombreDons}</span></p>
    </section>
  );
};