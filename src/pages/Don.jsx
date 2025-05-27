
import { useState } from "react";
import Address from "../composants/Don/Address";
import PaymentMethod from "../composants/Don/PaymentMethod";
import NavigationDivs from "../composants/Don/page";

export const Don = () => {
  const [activeAddress, setActiveAddress] = useState(false);
  const [selectAmount, setSelectAmount] = useState(null);
  const [paymentType, setPaymentType] = useState(null);

  // Fonction pour calculer les frais
  const getFinalAmount = (amount, method) => {
    if (!amount) return 0;

    let finalAmount = amount;

    if (method === "paypal") {
      const fees = amount * 0.054 + 0.35;
      finalAmount = parseFloat((amount + fees).toFixed(2));
    }

    if (method === "stripe") {
      const fees = amount * 0.014 + 0.25;
      finalAmount = parseFloat((amount + fees).toFixed(2));
    }

    if (method === "cinetpay") {
      const fees = amount * 0.03;
      finalAmount = parseFloat((amount + fees).toFixed(2));
    }

    return finalAmount;
  };

  const finalAmount = getFinalAmount(selectAmount, paymentType);

  return (
    <div className="min-h-screen grid items-center justify-center my-7 py-10 bg-[url('/images/aeey.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="min-h-screen grid items-center justify-center">
        <div className="flex justify-center items-center">
          <h1 className="text-2xl font-bold h-auto bg-white/50 md:p-3 md:w-auto px-1 w-auto mx-10 rounded grid items-center mt-7 text-gray-800 dark:text-white text-center">
            Aidez notre association à faire plus
          </h1>
        </div>

        <div
          className={`grid grid-cols-1 gap-5 md:px-5 items-start ${
            activeAddress ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <div className="w-full md:max-w-lg">
            <NavigationDivs
              setActiveAddress={setActiveAddress}
              setSelectAmount={setSelectAmount}
              setPaymentType={setPaymentType}
            />
          </div>

          {activeAddress && (
            <div className="md:max-w-lg">
              <Address />
            </div>
          )}

          <div className="md:max-w-lg">
            <PaymentMethod amount={finalAmount} type={paymentType} />
            {selectAmount && paymentType && (
              <p className="text-sm text-gray-700 mt-2 bg-white shadow-md">
                Vous avez choisi de faire un don de{" "}
                <strong>{selectAmount} €</strong>. Le montant prélevé sera de{" "}
                <strong>{finalAmount} €</strong> afin de couvrir les frais de la
                plateforme de paiement (<strong>{paymentType}</strong>).
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

