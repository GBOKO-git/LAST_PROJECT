
import { useAdminMembers } from "../../hooks/useAdminMember";
import Loading from "../Loading/LoadingButton";

export const ValidateMember = () => {
  const { members, loading, unauthorized, validate, reject, error } =
    useAdminMembers();

  if (loading) return <Loading />;
  if (unauthorized)
    return (
      <p className="text-red-600">Accès refusé. Réservé aux administrateurs.</p>
    );
  if (error) return <p className="text-red-500">Erreur : {error}</p>; // <-- affichage de l’erreur

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Demandes d'adhésion à valider</h2>
      {/* {members && members.length === 0 ? (
        <p className="text-gray-500">Aucune demande en attente.</p>
      ) : (
        <ul>
          {members.map((m) => (
            <li
              key={m._id}
              className="flex flex-wrap justify-between items-center mb-2 text-white gap-4"
            >
              <span>
                {m.membershipRequest?.name || m.name} (
                {m.membershipRequest?.email || m.email})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => validate(m._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                >
                  Valider
                </button>
                <button
                  onClick={() => reject(m._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
                >
                  Rejeter
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}   */}

      {Array.isArray(members) && members.length === 0 ? (
        <p className="text-gray-500">Aucune demande en attente.</p>
      ) : Array.isArray(members) ? (
        <ul>
          {members.map((m) => (
            <li
              key={m._id}
              className="flex flex-wrap justify-between items-center mb-2 text-black gap-4"
            >
              <span>
                {m.membershipRequest?.name || m.name} (
                {m.membershipRequest?.email || m.email})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => validate(m._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full"
                >
                  Valider
                </button>
                <button
                  onClick={() => reject(m._id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
                >
                  Rejeter
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-red-500">Erreur de chargement des membres.</p>
      )}
    </div>
  );
};

