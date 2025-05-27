import { Hero } from "../composants/Hero/Hero";
import { About } from "../composants/About/About";
import { Evenement } from "../composants/Evenements/Evenement";
import { RejoignezNous } from "../composants/JoinUS/RejoignezNous";

export const Accueil = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Evenement />
      <RejoignezNous />
    </div>
  );
};