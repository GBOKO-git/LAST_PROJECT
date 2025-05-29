import React, { useState } from "react";

const cotisation = [
  { amount: 50, money: "€" },
  { amount: 80, money: "€" },
  { amount: 130, money: "€" },
];

const donation = [
  { amount: 15, money: "€" },
  { amount: 30, money: "€" },
  { amount: 50, money: "€" },
  { amount: 80, money: "€" },
];

function Don({ setActiveAddress, setSelectAmount, setPaymentType }) {
  const [activeDiv, setActiveDiv] = useState("div1");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setSelectAmount(numericValue);
      setSelectedAmount(numericValue);
    } else {
      setSelectedAmount(null);
      setSelectAmount(null);
    }
  };

  const handleSwitchToDon = () => {
    setActiveAddress(true);
    setActiveDiv("div1");
    setPaymentType("don");
    setSelectAmount(null);
    setCustomAmount("");
    setSelectedAmount(null);
  };

  const handleSwitchToCotisation = () => {
    setActiveDiv("div2");
    setActiveAddress(false);
    setPaymentType("cotisation");
    setSelectAmount(null);
    setSelectedAmount(null);
    setCustomAmount("");
  };

  return (
    <div className="dark:text-black">
      <div className="w-full md:max-w-3xl mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold h-10 rounded-t-lg bg-blue-500 text-white">
          Mon Don
        </h2>

        <div className="bg-white/90 dark:bg-gray-800 p-8 rounded-b-lg shadow-md border dark:border-gray-700">
          {/* Switch buttons */}
          <div className="grid grid-cols-2 h-24 items-center">
            <button
              onClick={handleSwitchToDon}
              className={`px-4 md:py-3 rounded-l ${
                activeDiv === "div1"
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-slate-50/10 border border-purple-950 text-black dark:text-white"
              }`}
            >
              faire un don
            </button>
            <button
              onClick={handleSwitchToCotisation}
              className={`px-4 md:py-3 rounded-r ${
                activeDiv === "div2"
                  ? "bg-purple-500 text-white hover:bg-purple-600"
                  : "bg-slate-50/10 border border-purple-950 text-black dark:text-white"
              }`}
            >
              <span className="max-sm:hidden">Payer </span>ma cotisation
            </button>
          </div>

          {/* Cotisation */}
          {activeDiv === "div2" && (
            <div className="grid gap-5 mt-4">
              <div className="grid grid-cols-3 gap-2">
                {cotisation.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectAmount(item.amount);
                      setSelectedAmount(item.amount);
                    }}
                    className="border text-center bg-gray-100 p-4 rounded flex justify-center items-center hover:bg-gray-200"
                  >
                    <p>{item.amount}</p>&nbsp;<span>{item.money}</span>
                  </button>
                ))}
              </div>
              <ul className="grid grid-cols-7">
                <input
                  type="number"
                  placeholder="Montant libre"
                  value={customAmount}
                  onChange={(e) => handleCustomAmount(e.target.value)}
                  className="border bg-gray-100 p-4 rounded-l col-span-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <li className="border text-center bg-gray-300 p-4 rounded-r col-span-1 flex items-center justify-center">
                  €
                </li>
              </ul>
              <div className="bg-blue-500 rounded text-start text-white p-2">
                <p className="bg-blue-500 rounded text-start text-white p-2">
                  {selectedAmount ? (
                    <>
                      En cotisant{" "}
                      <span className="font-sans text-orange-700 font-bold">
                        {selectedAmount}
                      </span>{" "}
                      €, vous soutenez la vie de notre association ! <br />
                      Votre contribution permet de financer nos projets et nos
                      événements.
                    </>
                  ) : (
                    <>
                      Soutenez la vie de notre association ! <br />
                      Votre cotisation permet de financer nos projets et nos
                      événements.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Don */}
          {activeDiv === "div1" && (
            <div className="bg-gray-100 p-4 rounded shadow mt-4">
              <div className="grid gap-5">
                <div className="grid grid-cols-4 gap-2">
                  {donation.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectAmount(item.amount);
                        setSelectedAmount(item.amount);
                      }}
                      className="border text-center bg-gray-100 p-4 rounded flex justify-center items-center hover:bg-gray-200"
                    >
                      <p>{item.amount}</p>&nbsp;<span>{item.money}</span>
                    </button>
                  ))}
                </div>
                <ul className="grid grid-cols-7">
                  <input
                    type="number"
                    placeholder="Montant libre"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    className="border bg-gray-100 p-4 rounded-l col-span-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <li className="border text-center bg-gray-300 p-4 rounded-r col-span-1 flex items-center justify-center">
                    €
                  </li>
                </ul>
                <p className="bg-blue-600 rounded text-justify text-white p-2">
                  {selectedAmount ? (
                    <>
                      En faisant un don de{" "}
                      <span className="font-sans text-orange-700 font-bold">
                        {selectedAmount}
                      </span>{" "}
                      € à AEEY, vous aidez des personnes à acquérir de nouvelles
                      compétences et à subvenir aux besoins de leur famille.
                    </>
                  ) : (
                    <>
                      En faisant un don à AEEY, vous aidez des personnes à acquérir
                      de nouvelles compétences et à subvenir aux besoins de leur
                      famille.
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Don; 