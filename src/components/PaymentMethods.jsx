// import React from 'react';
// import { FaCreditCard, FaPaypal, FaMobileAlt } from 'react-icons/fa';

// export const PaymentMethods = ({ selectedMethod, onSelectMethod }) => {
//   const paymentMethods = [
//     {
//       id: 'card',
//       name: 'Carte bancaire',
//       icon: <FaCreditCard className="w-6 h-6" />,
//       description: 'Paiement sécurisé par carte bancaire'
//     },
//     {
//       id: 'paypal',
//       name: 'PayPal',
//       icon: <FaPaypal className="w-6 h-6" />,
//       description: 'Paiement via votre compte PayPal'
//     },
//     {
//       id: 'mobile',
//       name: 'Mobile Money',
//       icon: <FaMobileAlt className="w-6 h-6" />,
//       description: 'Paiement via Mobile Money (Orange Money, MTN Money, etc.)'
//     }
//   ];

//   return (
//     <div className="space-y-4">
//       <h3 className="text-lg font-semibold text-gray-900">Méthode de paiement</h3>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {paymentMethods.map((method) => (
//           <button
//             key={method.id}
//             onClick={() => onSelectMethod(method.id)}
//             className={`p-4 rounded-lg border-2 transition-all ${
//               selectedMethod === method.id
//                 ? 'border-indigo-600 bg-indigo-50'
//                 : 'border-gray-200 hover:border-indigo-200'
//             }`}
//           >
//             <div className="flex flex-col items-center space-y-2">
//               <div className={`${
//                 selectedMethod === method.id ? 'text-indigo-600' : 'text-gray-500'
//               }`}>
//                 {method.icon}
//               </div>
//               <h4 className="font-medium text-gray-900">{method.name}</h4>
//               <p className="text-sm text-gray-500 text-center">{method.description}</p>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// } 