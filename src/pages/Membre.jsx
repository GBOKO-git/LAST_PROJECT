import { useState, useEffect } from "react";
import Loading from "../composants/Loading/LoadingButton";

// Données temporaires pour simuler l'API
const membresData = [
  {
    name: 'AZOUM',
    job: "Président",
    photo: "https://via.placeholder.com/150",
    phone: "+225 0123456789",
    email: "azoum@example.com"
  },
  {
    name: 'KOFFI',
    job: "Vice-Président",
    photo: "https://via.placeholder.com/150",
    phone: "+225 0123456789",
    email: "koffi@example.com"
  },
  {
    name: 'KOUAME',
    job: "Secrétaire",
    photo: "https://via.placeholder.com/150",
    phone: "+225 0123456789",
    email: "kouame@example.com"
  },
  {
    name: 'YAO',
    job: "Trésorier",
    photo: "https://via.placeholder.com/150",
    phone: "+225 0123456789",
    email: "yao@example.com"
  }
];

export const Membre = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllMembers = async () => {
    try {
      // Simuler un appel API avec un délai
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMembers(membresData);
    } catch (error) {
      console.error("Erreur de chargement des membres", error.message);
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
            <div className="flex flex-wrap -m-2">
              {members.map((member, index) => (
                <div key={index} className="p-2 lg:w-1/3 md:w-1/2 w-full">
                  <div className="h-full flex flex-col items-center shadow-md bg-blue-100 border-gray-200 border p-4 rounded-lg">
                    <img
                      alt="team"
                      className="w-16 h-16 bg-gray-100 object-cover object-center rounded-full mb-4"
                      src={member.photo}
                    />
                    <div className="text-center">
                      <h2 className="text-gray-900 title-font font-medium">
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