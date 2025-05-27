import { CreditCard } from "lucide-react";
import { useState } from "react";
import { IoLogoPaypal } from "react-icons/io5";

export const PaymentMethod = () => {
  const [active, setActive] = useState("bank");
  return (
    <>
      <div>
        <div className="w-full max-w-3xl mx-auto p-8">
          <h2 className="text-2xl text-center font-semibold h-10 rounded-t-lg bg-blue-600 text-gray-700 dark:text-white ">
            METHODES DE PAIEMENT
          </h2>

          <div className="grid gap-5 bg-white/90 dark:bg-gray-800 p-8 rounded-b-lg shadow-md border dark:border-gray-700">
            {/* <!-- Payment Information --> */}

            <div className="grid grid-cols-3 w-auto h-24 items-center gap-5">
              <div className="grid justify-center ">
                <button onClick={() => setActive("bank")}>
                  <div className="grid justify-center ">
                    <CreditCard size={48} color="purple" />
                  </div>
                  <input disabled className={` ${active === "bank" ? "border-b-4 text-center w-28 border-black"  : "text-center  w-28"}`}  placeholder="Carte bancaire "/>
                  <div></div>
                </button>
              </div>
              <div className="grid justify-center ">
                <button onClick={() => setActive("paypal")}>
                  <div className="grid justify-center " >
                    <IoLogoPaypal size={48} color="purple"  />
                  </div>
                  <input disabled className={` ${active === "paypal" ? "border-b-4 text-center w-16 border-black"  : "text-center w-16"}`}  placeholder="PAYPAL "/>
                </button>
              </div>
              <div className="grid justify-center ">
                <button onClick={() => setActive("mobile")}>
                  <div className="grid justify-center  ">
                    <img
                      className="rounded w-24 h-10 mb-1"
                      src="/images/mobilemoney.png"
                      alt="mobile money"
                    />
                  </div>
                  <input disabled className={` ${active === "mobile" ? "border-b-4 text-center w-28 border-black"  : "text-center w-28"}`}  placeholder="Mobile money "/>
                </button>
              </div>
            </div>

            {active === "bank" && (
              <div>
                <div className="mt-4">
                  <label
                    htmlFor="card_number"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label
                      htmlFor="exp_date"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      Expiration Date
                    </label>
                    <input
                      type="text"
                      id="exp_date"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-gray-700 dark:text-white mb-1"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                    />
                  </div>
                </div>
              </div>
            )}
            {active === "paypal" && (
              <div>
                <div className="mt-4">
                  <label
                    htmlFor="card_number"
                    className="block text-gray-700 dark:text-white mb-1"
                    
                  >
                    paypal button
                  </label>
                  <input
                    type="text"
                    id="card_number"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>
              </div>
            )}

            {active === "mobile" && (
              <div>
                <div className="mt-4 w-full">
                  <select name="" id="" className="w-full rounded">
                    <option value="orange">orange</option>
                    <option value="orange">mtn</option>
                    <option value="orange">moov</option>
                    <option value="orange">wave</option>
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div></div>
                  <div></div>
                  <div>
                    <h1>moov</h1>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
