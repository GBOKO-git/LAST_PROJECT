import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";
import PayPalButton from "../paypal/PaypalButton";
import { usePaymentMethod } from "../../hooks/usePaymentMethod";
import { IoLogoPaypal } from "react-icons/io5";
// import { usePaymentMethod } from "@/hooks/usePaymentMethod";
// import PayPalButton from "../paypal/PaypalButton";

const PaymentMethod = ({ amount, type, donorInfo }) => {
  const [active, setActive] = useState(type || "bank");
  const { handleStripeCheckout, handlePayPalPayment, handleCinetPay } = usePaymentMethod();

  // Mettre à jour le bouton actif quand `type` change
  useEffect(() => {
    if (type) setActive(type);
  }, [type]);

  return (
    <div className="w-full max-w-3xl mx-auto md:p-8">
      <h2 className="text-2xl text-center font-semibold h-10 rounded-t-lg bg-blue-600 text-white">
        MÉTHODES DE PAIEMENT
      </h2>

      <div className="grid gap-5 bg-white/90 dark:bg-gray-800 p-8 rounded-b-lg shadow-md border dark:border-gray-700">
        <div className="grid grid-cols-3 h-24 items-center gap-5">
          {/* Stripe */}
          <div className="grid justify-center">
            <button onClick={() => setActive("bank")}>
              <div className="grid justify-center">
                <CreditCard size={48} color="purple" />
              </div>
              <div
                className={`text-center w-28 font-semibold ${
                  active === "bank" ? "border-b-4 border-black" : ""
                }`}
              >
                Carte bancaire
              </div>
            </button>
          </div>

          {/* PayPal */}
          <div className="grid justify-center">
            <button onClick={() => setActive("paypal")}>
              <div className="grid justify-center">
                <IoLogoPaypal size={48} color="purple" />
              </div>
              <div
                className={`text-center w-16 font-semibold ${
                  active === "paypal" ? "border-b-4 border-black" : ""
                }`}
              >
                PayPal
              </div>
            </button>
          </div>

          {/* CinetPay */}
          <div className="grid justify-center">
            <button onClick={() => setActive("mobile")}>
              <div className="grid justify-center">
                <img
                  className="rounded w-24 h-10 mb-1"
                  src="/images/mobilemoney.png"
                  alt="Mobile Money"
                />
              </div>
              <div
                className={`text-center w-28 font-semibold ${
                  active === "mobile" ? "border-b-4 border-black" : ""
                }`}
              >
                Mobile money
              </div>
            </button>
          </div>
        </div>

        {/* Affichage conditionnel selon la méthode */}
        {active === "bank" && (
          <button
            onClick={() => handleStripeCheckout(amount, type, donorInfo)}
            className="bg-green-600 text-white p-2 rounded mt-4"
            disabled={!amount}
          >
            Payer {amount ? `(${amount} €)` : ""} avec Stripe
          </button>
        )}

        {active === "paypal" && (
          <div>
            <PayPalButton 
              amount={amount?.toFixed(2)} 
              currency="EUR"
              onSuccess={async (details) => {
                try {
                  const transactionId = await handlePayPalPayment(amount, type, donorInfo);
                  // Gérer le succès du paiement PayPal
                  console.log('PayPal payment completed:', details);
                } catch (error) {
                  console.error('PayPal payment error:', error);
                  alert('Erreur lors du paiement PayPal: ' + error.message);
                }
              }}
            />
          </div>
        )}

        {active === "mobile" && (
          <button
            onClick={() => handleCinetPay(amount, type, donorInfo)}
            className="bg-green-600 text-white p-2 rounded mt-4"
            disabled={!amount}
          >
            Payer {amount ? `(${amount} €)` : ""} avec CinetPay
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;