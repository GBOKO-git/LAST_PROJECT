const Donation = require('../models/Donation');
const { body } = require('express-validator');
const emailService = require('../services/emailService');

// Validation rules
exports.validateDonation = [
  body('amount').isFloat({ min: 0.01 }).withMessage('Le montant doit être supérieur à 0'),
  body('paymentMethod').isIn(['paypal', 'card', 'bank_transfer']).withMessage('Méthode de paiement invalide'),
  body('isAnonymous').optional().isBoolean().withMessage('isAnonymous doit être un booléen')
];

// Créer un nouveau don
exports.createDonation = async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donor: req.user._id
    });

    await donation.save();

    // Envoyer un email de confirmation
    const emailHtml = `
      <h1>Confirmation de votre don</h1>
      <p>Merci pour votre don de ${donation.amount} ${donation.currency} !</p>
      <p>Votre soutien est précieux pour notre association.</p>
    `;
    await emailService.sendEmail(req.user.email, 'Confirmation de don - AEEY', emailHtml);

    res.status(201).json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Obtenir tous les dons (admin seulement)
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('donor', 'firstName lastName email')
      .sort('-createdAt');

    res.json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtenir les dons d'un utilisateur
exports.getUserDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ donor: req.user._id })
      .sort('-createdAt');

    res.json({
      success: true,
      count: donations.length,
      data: donations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Obtenir les statistiques des dons
exports.getDonationStats = async (req, res) => {
  try {
    const [totalStats] = await Donation.getTotalDonations();
    
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const yearlyStats = await Donation.getDonationsByPeriod(startOfYear, now);

    res.json({
      success: true,
      data: {
        total: totalStats?.total || 0,
        yearlyStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Mettre à jour le statut d'un don
exports.updateDonationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Don non trouvé'
      });
    }

    if (status === 'completed') {
      await donation.markAsCompleted();
    } else if (status === 'refunded') {
      await donation.markAsRefunded();
    } else {
      donation.status = status;
      await donation.save();
    }

    res.json({
      success: true,
      data: donation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
}; 