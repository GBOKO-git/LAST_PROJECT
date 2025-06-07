import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";

export const PayPalButton = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <div>
        <h3>Effectuer un paiement</h3>
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            color: "blue",
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              alert("Paiement réussi par " + details.payer.name.given_name);
            });
          }}
        />
      </div>
    </PayPalScriptProvider>
  );
};

