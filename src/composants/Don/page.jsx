import { useState } from "react";

export default function NavigationDivs() {
  const [activeDiv, setActiveDiv] = useState("div1");

  return (
    <div className=" dark:text-black">
      <div className="w-full md:max-w-3xl mx-auto p-8">
        <h2 className="text-2xl text-center font-semibold h-10 rounded-t-lg bg-blue-500 text-gray-700 dark:text-white ">
          Mon Don
        </h2>

        <div className="bg-white/90 dark:bg-gray-800 p-8 rounded-b-lg shadow-md border dark:border-gray-700">
          {/* <!-- Payment Information --> */}

          <div className="grid grid-cols-2 h-24 items-center">
            <button
              onClick={() => setActiveDiv("div1")}
              className={`${
                activeDiv === "div1"
                  ? "bg-purple-500 text-white px-4 md:py-3 rounded-l hover:bg-purple-600"
                  : "bg-slate-50/10 border border-purple-950 text-black  dark:text-white px-4 md:py-3 rounded-l"
              }`}
            >
              <span className="md:hidden">Don unique</span>
              <span className="hidden md:block">Je donne une fois</span>
            </button>
            <button
              onClick={() => setActiveDiv("div2")}
              className={`${
                activeDiv === "div2"
                  ? "bg-purple-500 text-white px-4  rounded-r hover:bg-purple-600"
                  : "bg-slate-50/10 border border-purple-950 text-black  dark:text-white px-4  rounded-r"
              }`}
            >
              <span className="max-sm:hidden">Je donne </span>chaque mois
            </button>
          </div>

          {activeDiv === "div1" && (
            <div>
              <div className="grid gap-5">
                <ul className="grid grid-cols-3 gap-2">
                  <li className="border text-center bg-gray-100 p-4  rounded ">
                    <label htmlFor="">50</label>&nbsp;<span>€</span>
                  </li>
                  <li className="border text-center bg-gray-100 p-4  rounded ">
                    <label htmlFor="">80</label>&nbsp;<span>€</span>
                  </li>
                  <li className="border text-center bg-gray-100 p-4  rounded ">
                    <label htmlFor="">130</label>&nbsp;<span>€</span>
                  </li>
                </ul>
                <ul className="grid grid-cols-7">
                  <input
                    placeholder="Montant libre"
                    className="border  bg-gray-100 p-4  rounded-l col-span-6"
                  />
                  <li className=" border text-center bg-gray-300 p-4  rounded-r col-span-1">
                    <label>€</label>
                  </li>
                </ul>
                <p className="bg-blue-500 rounded text-justify text-white p-2">
                  En faisant un don à AEEY, vous aidez des personnes à
                  acquérir de nouvelles compétences et à subvenir aux besoins de
                  leur famille.
                </p>
              </div>
            </div>
          )}
          {activeDiv === "div2" && (
            <div className="bg-gray-100 p-4 rounded shadow">
              <div>
                <div className="grid gap-5">
                  <ul className="grid grid-cols-4 gap-2">
                    <li className="border text-center bg-gray-100 p-4  rounded ">
                      <label htmlFor="">15</label>&nbsp;<span>€</span>
                    </li>
                    <li className="border text-center bg-gray-100 p-4  rounded ">
                      <label htmlFor="">30</label>&nbsp;<span>€</span>
                    </li>
                    <li className="border text-center bg-gray-100 p-4  rounded ">
                      <label htmlFor="">50</label>&nbsp;<span>€</span>
                    </li>
                    <li className="border text-center bg-gray-100 p-4  rounded ">
                      <label htmlFor="">80</label>&nbsp;<span>€</span>
                    </li>
                  </ul>
                  <ul className="grid grid-cols-7">
                    <input
                      placeholder="Montant libre"
                      className="border  bg-gray-100 p-4  rounded-l col-span-6"
                    />
                    <li className=" border text-center bg-gray-300 p-4  rounded-r col-span-1">
                      <label>€</label>
                    </li>
                  </ul>
                  <p className="bg-blue-600 rounded text-justify text-white p-2">
                    En faisant un don à AEEY, vous aidez des personnes à
                  acquérir de nouvelles compétences et à subvenir aux besoins de
                  leur famille.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
