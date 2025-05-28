
// import { useEffect, useState } from "react";
// import axios from "axios";
import useAdminMembers from "@/hooks/useAdminMember";
import Loading from "../Loading/loadingButton";

const ValidateMembers = () => {
  // const [members, setMembers] = useState([]);
  const {members, loading, unauthorized,  validate, reject, deleteMember } = useAdminMembers();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   axios
  //     .get("/api/member?pendingOnly=true", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => setMembers(res.data))
  //     .catch((err) => console.error(err));
  // }, []);

 

  if (loading) return <Loading />;
  if (unauthorized)
    return (
      <p className="text-red-600">Accès refusé. Réservé aux administrateurs.</p>
    );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Membres à valider</h2>
      {members.length === 0 ? (
        <p className="text-gray-500">Aucun membre à valider.</p>
      ) : (
        <ul>
          {members.map((m) => (
            <li
              key={m._id}
              className="flex justify-between items-center mb-2 text-white gap-4"
            >
              <span>
                {m.name} ({m.email})
              </span>
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full ml-2"
                onClick={() => validate(m._id)}
              >
                Valider
              </button>
              <button
                onClick={() => reject(m._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full ml-2"
              >
                Rejeter
              </button>
              {/* <button
                onClick={() => deleteMember(m._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full ml-2"
              >
                Rejeter
              </button> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ValidateMembers;
