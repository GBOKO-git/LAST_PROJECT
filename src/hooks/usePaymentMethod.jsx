// hooks/usePaymentMethod.js
import {
  API_CONFIG,
  buildApiUrl,
  getDefaultHeaders,
} from "../services/api.config";
import { useUser } from "./useUser";

export const usePaymentMethod = () => {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  const initiatePayment = async (paymentData) => {
    try {
      const basePaymentData = {
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        type: paymentData.type,
        year: new Date().getFullYear(),
        isAnonymous: paymentData.isAnonymous || false,
      };

      if (!paymentData.isAnonymous) {
        basePaymentData.userId = user?.id;
        basePaymentData.donorInfo = paymentData.donorInfo;
      } else {
        basePaymentData.anonymousId = "ANON_" + Date.now();
      }

      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.INITIATE), {
        method: "POST",
        headers: getDefaultHeaders(token),
        body: JSON.stringify(basePaymentData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Erreur lors de l'initiation du paiement"
        );
      }

      return data;
    } catch (error) {
      console.error("Erreur lors de l'initiation du paiement:", error);
      throw error;
    }
  };

  const handleStripeCheckout = async (amount, type = "don", donorInfo = null) => {
    try {
      const paymentData = {
        amount,
        paymentMethod: "card",
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear(),
      };

      const { transactionId } = await initiatePayment(paymentData);

      const res = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.STRIPE), {
        method: "POST",
        headers: getDefaultHeaders(token),
        body: JSON.stringify({
          amount,
          transactionId,
          isAnonymous: donorInfo?.isAnonymous || false,
        }),
      });

      const data = await res.json();

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || "Erreur Stripe");
      }
    } catch (err) {
      console.error("Erreur Stripe :", err);
      alert("Erreur : " + err.message);
    }
  };

  const handlePayPalPayment = async (amount, type = "don", donorInfo = null) => {
    try {
      const paymentData = {
        amount,
        paymentMethod: "paypal",
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear(),
      };

      const { transactionId } = await initiatePayment(paymentData);

      return transactionId;
    } catch (err) {
      console.error("Erreur PayPal :", err);
      throw err;
    }
  };

  const euroToXof = (euroAmount) => Math.round(euroAmount * 655.957);

  const handleCinetPay = async (euroAmount, type = "don", donorInfo = null) => {
    const amountXof = euroToXof(euroAmount);

    if (amountXof < 100) {
      alert("Le montant minimum pour CinetPay est 100 XOF (~0,15 €).");
      return;
    }

    try {
      const paymentData = {
        amount: euroAmount,
        paymentMethod: "mobile",
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear(),
      };

      // Appel à initiatePayment, qui retourne la réponse complète du backend
      const data = await initiatePayment(paymentData);
      console.log("Réponse API CinetPay (dans frontend) :", data);

      // --- CORRECTION ICI : Utiliser `data.paymentUrl` au lieu de `data.url` ---
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error("URL de paiement manquante");
      }
    } catch (err) {
      console.error("Erreur CinetPay (frontend) :", err);
      alert("Erreur : " + err.message);
    }
  };

  return {
    handleStripeCheckout,
    handlePayPalPayment,
    handleCinetPay,
  };
};
