// hooks/usePaymentMethod.js
import { useUser } from './useUser';

export const usePaymentMethod = () => {
  const { user } = useUser();

  const initiatePayment = async (paymentData) => {
    try {
      // Préparer les données minimales pour un don anonyme
      const basePaymentData = {
        amount: paymentData.amount,
        paymentMethod: paymentData.paymentMethod,
        type: paymentData.type,
        year: new Date().getFullYear(),
        isAnonymous: paymentData.isAnonymous || false,
      };

      // Si ce n'est pas un don anonyme, ajouter les informations du donateur
      if (!paymentData.isAnonymous) {
        basePaymentData.userId = user?.id;
        basePaymentData.donorInfo = paymentData.donorInfo;
      } else {
        // Pour les dons anonymes, on ajoute juste un identifiant unique
        basePaymentData.anonymousId = 'ANON_' + Date.now();
      }

      const res = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(basePaymentData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Erreur lors de l\'initiation du paiement');
      }
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'initiation du paiement:', error);
      throw error;
    }
  };

  const handleStripeCheckout = async (amount, type = 'don', donorInfo = null) => {
    try {
      // 1. Initier la transaction dans notre backend
      const paymentData = {
        amount,
        paymentMethod: 'card',
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear()
      };

      const { transactionId } = await initiatePayment(paymentData);

      // 2. Rediriger vers Stripe
      const res = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount,
          transactionId,
          isAnonymous: donorInfo?.isAnonymous || false
        })
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.message || 'Erreur Stripe');
      }
    } catch (err) {
      console.error("Erreur Stripe :", err);
      alert("Erreur : " + err.message);
    }
  };

  const handlePayPalPayment = async (amount, type = 'don', donorInfo = null) => {
    try {
      // 1. Initier la transaction dans notre backend
      const paymentData = {
        amount,
        paymentMethod: 'paypal',
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear()
      };

      const { transactionId } = await initiatePayment(paymentData);

      // 2. Retourner l'ID de transaction pour PayPal
      return transactionId;
    } catch (err) {
      console.error("Erreur PayPal :", err);
      throw err;
    }
  };

  const euroToXof = (euroAmount) => Math.round(euroAmount * 655.957);

  const handleCinetPay = async (euroAmount, type = 'don', donorInfo = null) => {
    const amountXof = euroToXof(euroAmount);

    if (amountXof < 100) {
      alert("Le montant minimum pour CinetPay est 100 XOF (~0,15 €).");
      return;
    }

    try {
      // 1. Initier la transaction dans notre backend
      const paymentData = {
        amount: euroAmount,
        paymentMethod: 'mobile',
        type,
        isAnonymous: donorInfo?.isAnonymous || false,
        donorInfo: donorInfo?.isAnonymous ? null : donorInfo,
        year: new Date().getFullYear()
      };

      const { transactionId } = await initiatePayment(paymentData);

      // 2. Rediriger vers CinetPay
      const res = await fetch("/api/payment/cinetpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: amountXof,
          transactionId,
          isAnonymous: donorInfo?.isAnonymous || false
        })
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("❌ Réponse non JSON :", text);
        throw new Error("Erreur inattendue : " + text);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de paiement manquante");
      }
    } catch (err) {
      console.error("Erreur CinetPay :", err);
      alert("Erreur : " + err.message);
    }
  };

  return {
    handleStripeCheckout,
    handlePayPalPayment,
    handleCinetPay
  };
};