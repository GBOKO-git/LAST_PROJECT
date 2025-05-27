// app/hooks/useStats.js

import { useEffect, useState } from "react";
import axios from "axios";

export default function useStats() {
  const [stats, setStats] = useState({
    dons: 0,
    cotisations: 0,
    depenses: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [donsRes, cotiRes, depRes] = await Promise.all([
          axios.get("/api/don"),
          axios.get("/api/cotisation"),
          axios.get("/api/depense"),
        ]);

        const dons = donsRes.data?.reduce?.((sum, d) => sum + d.amount, 0) || 0;
        const cotisations = cotiRes.data?.reduce?.((sum, c) => sum + c.amount, 0) || 0;
        const depenses = depRes.data?.reduce?.((sum, d) => sum + d.amount, 0) || 0;

        setStats({ dons, cotisations, depenses });
      } catch (error) {
        console.error("Erreur lors de la récupération des stats :", error.message);
      }
    };

    fetchStats();
  }, []);

  return stats;
}