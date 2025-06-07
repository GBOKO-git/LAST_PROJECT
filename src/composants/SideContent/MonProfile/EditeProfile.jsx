

import { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';
import { useUserProfile } from '../../../hooks/useUserProfile';
import Loading from '../../Loading/LoadingButton';
import { useNavigate } from 'react-router-dom';

const steps = [
  { title: 'Personal Information', icon: <FaUser /> },
  { title: 'Contact Details', icon: <FaPhone /> },
  { title: 'Address & Infos', icon: <FaMapMarkerAlt /> },
  { title: 'Confirmation', icon: <FaCheck /> },
];

export const EditeProfile = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const {
    user,
    loading,
    error,
    successMessage,
    updateUserProfile,
    refetchProfile,
  } = useUserProfile();

  const [formData, setFormData] = useState({
    nom: '',
    prennom: '',
    email: '',
    phone: '',
    job: '',
    cv: '',
    address: '',
    photo: '',
  });

  // Synchroniser les données quand l'utilisateur est chargé
  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        phone: user.phone || '',
        job: user.job || '',
        cv: user.cv || '',
        address: user.address || '',
        photo: user.photo || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    if (!formData.nom || !formData.email) {
      alert('Nom et email sont obligatoires.');
      
      return;
    }

    try {
      await updateUserProfile(formData);
      await refetchProfile();
      console.log("Profil mis à jour !");
      navigate(-1)
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center mt-4">Erreur de chargement : {error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-lg overflow-hidden">
        {/* Stepper */}
        <div className="flex justify-between items-center bg-cyan-100 px-8 py-4">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white ${
                  i === step ? 'bg-cyan-500' : 'bg-cyan-300'
                }`}
              >
                {s.icon}
              </div>
              <p className={`text-sm mt-2 ${i === step ? 'font-semibold text-cyan-800' : 'text-cyan-500'}`}>
                {s.title}
              </p>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="p-8">
          {successMessage && (
            <div className="text-green-600 text-sm mb-4">{successMessage}</div>
          )}

          {step === 0 && (
            <>
              <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Personal Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Nom" name="nom" value={formData.nom} onChange={handleChange} />
                <Input label="prenom" name="prenom" value={formData.prenom} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Contact Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Numéro de téléphone" name="phone" value={formData.phone} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Address & Infos</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Fonction" name="job" value={formData.job} onChange={handleChange} />
                <Input label="CV" name="cv" value={formData.cv} onChange={handleChange} />
                <Input label="Adresse" name="address" value={formData.address} onChange={handleChange} />
                <Input label="Photo (URL)" name="photo" value={formData.photo} onChange={handleChange} />
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-2xl font-semibold text-cyan-800 mb-6">Confirmation</h2>
              <div className="text-cyan-700 space-y-2">
                <p><strong>Nom:</strong> {formData.nom}</p>
                <p><strong>PRENOMS:</strong> {formData.prenom}</p>
                <p><strong>Téléphone:</strong> {formData.phone}</p>
                <p><strong>Fonction:</strong> {formData.job}</p>
                <p><strong>CV:</strong> {formData.cv}</p>
                <p><strong>Adresse:</strong> {formData.address}</p>
                <p><strong>Photo:</strong> {formData.photo}</p>
              </div>
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            {step > 0 ? (
              <button
                onClick={prevStep}
                className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Précédent
              </button>
            ) : (
              <div />
            )}

            {step < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 rounded-xl bg-cyan-500 text-white hover:bg-cyan-600 transition"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 rounded-xl bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50"
              >
                {loading ? 'Chargement...' : 'Soumettre'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, full = false, type = 'text' }) => (
  <div className={`w-full ${full ? 'col-span-2' : ''}`}>
    <label className="block text-sm font-medium text-cyan-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  </div>
);

