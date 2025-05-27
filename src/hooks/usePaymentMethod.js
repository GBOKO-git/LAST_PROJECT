// hooks/usePaymentMethod.js

export const usePaymentMethod = () => {
  const handleStripeCheckout = async (amount) => {
    try {
      const res = await fetch("/api/payment/stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // Le montant en centimes (€ x 100)
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("Erreur Stripe :", data);
        alert("Erreur Stripe : " + (data?.error || "inconnue"));
      }
    } catch (err) {
      console.error("Erreur réseau Stripe :", err);
      alert("Erreur réseau Stripe : " + err.message);
    }
  };


  const euroToXof = (euroAmount) => Math.round(euroAmount * 655.957);

  const handleCinetPay = async (euroAmount) => {
    const amountXof = euroToXof(euroAmount);

    if (amountXof < 100) {
      alert("Le montant minimum pour CinetPay est 100 XOF (~0,15 €).");
      return;
    }

    try {
      const res = await fetch("/api/payment/cinetpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountXof }),
      });

      const text = await res.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error("❌ Réponse non JSON :", text);
        alert("Erreur inattendue : " + text);
        return;
      }

      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        console.error("❌ Erreur CinetPay complète :", data);
        alert("Erreur CinetPay : " + (data?.description || data?.message || data?.error || "inconnue"));
      }
    } catch (err) {
      console.error("🔥 Erreur réseau CinetPay :", err);
      alert("Erreur réseau CinetPay : " + err.message);
    }
  };

  // const handleCinetPay = async (amount) => {
  //   try {
  //     const res = await fetch("/api/payment/cinetpay", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ amount }),
  //     });

  //     const data = await res.json();

  //     if (res.ok && data.url) {
  //       window.location.href = data.url;
  //     } else {
  //       console.error("Erreur CinetPay :", data);
  //       alert("Erreur CinetPay : " + (data?.error || "inconnue"));
  //     }
  //   } catch (err) {
  //     console.error("Erreur réseau CinetPay :", err);
  //     alert("Erreur réseau CinetPay : " + err.message);
  //   }
  // };

  return { handleStripeCheckout, handleCinetPay };
};