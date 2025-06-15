import { useState, useEffect } from "react";
import Loading from "../composants/Loading/LoadingButton";
import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
} from "../services/api.config";
import axios from "axios";

// Données temporaires pour simuler l'API
const membresData = [
  {
    name: "amara gboko",
    job: "Président",
    photo: "/members/azoum.jpg",
    phone: "+225 0758019243",
    email: "gboko.amara1@gmail.com",
  },
  {
    name: "KAMAGATE Gboko",
    job: "Président fondateur",
    photo: "/members/kamagate.jpeg",
    phone: "+225 0757582663",
    email: "gbokokamagate@gmail.com ",
  },
  {
    name: "KOUAKOU Kouassi Jean Cyrille",
    job: "Vice-President",
    photo: "/members/azoum.jpg",
    phone: "+225 0759689636",
    email: "kouk030403@gmail.com",
  },
  {
    name: "Amara Adigata",
    job: "Trésorière",
    photo: "/members/adigata.jpeg",
    phone: "+225 0747408523",
    email: "adigataamara@gmail.com",
  },
];

export const Membre = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = getDefaultHeaders(token);

      if (!token) {
        throw new Error("Token manquant. Veuillez vous connecter.");
      }

      const { data } = await axios.get(
        buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.MEMBRE),
        {
          headers,
        }
      );
      console.log("Données reçues:", data);  // Ajoute ça
      setMembers(data.members);
    } catch (error) {
      console.error("Erreur de chargement des membres", error.message);
      setMembers(membresData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMembers();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      <div className="min-h-screen w-full grid justify-center items-center">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Notre équipe
              </h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-serif">
                "Une association de jeunes élèves et étudiants originaires de
                Yaokro, unis autour d'un objectif commun."
              </p>
            </div>
            <div className="flex flex-wrap -m-2 justify-center">
              {members.map((member, index) => (
                <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex flex-col items-center shadow-md bg-blue-100 border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center rounded-full mb-4"
                      src={member.photo}
                    />
                    <div className="text-center">
                      <h2 className="text-gray-900 title-font font-medium uppercase">
                        {member.name}
                      </h2>
                      <p className="text-gray-500">{member.phone}</p>
                      <p className="text-gray-500">{member.job}</p>
                      <p className="text-gray-500">{member.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
