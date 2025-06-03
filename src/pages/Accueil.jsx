import { Hero } from "../composants/Hero/Hero";
import { About } from "../composants/About/About";
import { Evenement } from "../composants/Evenements/Evenement";
import { RejoignezNous } from "../composants/JoinUS/RejoignezNous";
import Loading from "../composants/Loading/LoadingButton";
import { useEffect, useState } from "react";

export const Accueil = () => {
  const [loading , setLoading ] = useState(true)

  useEffect(() => {
    const timer =  setTimeout(() => {
      setLoading(false)
    }, 1000);
    return () => clearTimeout(timer)
  }, [])
  
  if (loading) return <Loading/>


  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Hero />
      <About />
      <Evenement />
      <RejoignezNous />
    </div>
  );
};