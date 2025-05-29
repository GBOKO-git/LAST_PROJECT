const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const { validate } = require('../middleware/validator');
const {
  createDonation,
  getAllDonations,
  getUserDonations,
  getDonationStats,
  updateDonationStatus,
  validateDonation
} = require('../controllers/donationController');

// Routes publiques
router.get('/stats', getDonationStats);

// Routes protégées (utilisateur connecté)
router.use(protect);
router.post('/', validate(validateDonation), createDonation);
router.get('/me', getUserDonations);

// Routes admin
router.use(authorize('admin'));
router.get('/', getAllDonations);
router.patch('/:id/status', updateDonationStatus);

module.exports = router; 