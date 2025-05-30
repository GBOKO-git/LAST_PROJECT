import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Address from "../composants/Don/Address";
import PaymentMethod from "../composants/Don/PaymentMethod";
import NavigationDivs from "../composants/Don/page";
import { DonationForm } from "../components/DonationForm";
import { useUser } from "../hooks/useUser";

export const Don = () => {
  const [step, setStep] = useState(1); // 1: montant, 2: formulaire, 3: paiement
  const [selectAmount, setSelectAmount] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [donorInfo, setDonorInfo] = useState(null);
  const { user } = useUser();
  const navigate = useNavigate();

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

  const handleDonorInfoSubmit = (formData) => {
    setDonorInfo(formData);
    setStep(3); // Passer à l'étape de paiement
  };

  const handleNextStep = (isAnonymous) => {
    if (paymentType === "cotisation") {
      // Pour les cotisations, vérifier si l'utilisateur est connecté
      if (!user) {
        // Rediriger vers la page de connexion si non connecté
        alert("Veuillez vous connecter pour payer votre cotisation");
        navigate("/connexion");
        return;
      }
      
      // Si l'utilisateur est connecté, utiliser ses informations
      setDonorInfo({
        firstName: user.firstName || user.prenom,
        lastName: user.lastName || user.nom,
        email: user.email,
        phone: user.phone || user.telephone,
        address: user.address || user.adresse,
        amount: selectAmount,
        isRecurring: false,
        isAnonymous: false
      });
      setStep(3); // Aller directement au paiement
    } else {
      // Pour les dons
      if (isAnonymous) {
        // Don anonyme
        setDonorInfo({ isAnonymous: true, amount: selectAmount });
        setStep(3);
      } else {
        // Don non-anonyme
        if (user) {
          // Pré-remplir avec les infos utilisateur mais permettre la modification
          setDonorInfo({
            firstName: user.firstName || user.prenom,
            lastName: user.lastName || user.nom,
            email: user.email,
            phone: user.phone || user.telephone,
            address: user.address || user.adresse,
            amount: selectAmount,
            isAnonymous: false
          });
        }
        setStep(2); // Aller au formulaire
      }
    }
  };

  const finalAmount = getFinalAmount(selectAmount, paymentType);

  return (
    <div className="min-h-screen grid items-center justify-center my-7 py-10 bg-[url('/images/aeey.jpeg')] bg-no-repeat bg-cover bg-center bg-fixed">
      <div className="min-h-screen grid items-center justify-center">
        <div className="flex justify-center items-center">
          <h1 className=" mb-2 text-2xl font-bold h-auto bg-white/50 md:p-3 md:w-auto px-1 w-auto mx-10 rounded grid items-center mt-7 text-gray-800 dark:text-white text-center">
            Aidez notre association à faire plus
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 md:px-5 items-start">
          {/* Étape 1: Sélection du montant */}
          {step === 1 && (
            <div className="w-full md:max-w-lg">
              <NavigationDivs
                setActiveAddress={setStep}
                setSelectAmount={setSelectAmount}
                setPaymentType={setPaymentType}
                onNext={handleNextStep}
              />
            </div>
          )}

          {/* Étape 2: Formulaire donateur */}
          {step === 2 && (
            <div className="w-full md:max-w-2xl">
              <DonationForm
                initialData={donorInfo || { amount: selectAmount }}
                onSubmit={handleDonorInfoSubmit}
              />
            </div>
          )}

          {/* Étape 3: Méthodes de paiement */}
          {step === 3 && (
            <div className="w-full md:max-w-lg">
              <PaymentMethod 
                amount={finalAmount} 
                type={paymentType} 
                donorInfo={donorInfo}
              />
              {selectAmount && paymentType && (
                <p className="text-sm text-gray-700 mt-2 bg-white shadow-md p-4 rounded">
                  {paymentType === "cotisation" ? "Vous payez une cotisation" : "Vous faites un don"} de{" "}
                  <strong>{selectAmount} €</strong>. Le montant prélevé sera de{" "}
                  <strong>{finalAmount} €</strong> afin de couvrir les frais de la
                  plateforme de paiement (<strong>{paymentType}</strong>).
                </p>
              )}
            </div>
          )}

          {/* Boutons de navigation entre les étapes */}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Retour
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

