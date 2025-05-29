const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'EUR'
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['paypal', 'card', 'bank_transfer']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentId: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isAnonymous: {
    type: Boolean,
    default: false
  },
  campaign: {
    type: String
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Index pour la recherche
donationSchema.index({ donor: 1, createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ campaign: 1 });

// Méthodes statiques
donationSchema.statics.getTotalDonations = async function() {
  return this.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
};

donationSchema.statics.getDonationsByPeriod = async function(startDate, endDate) {
  return this.aggregate([
    {
      $match: {
        status: 'completed',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        total: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ]);
};

// Méthodes d'instance
donationSchema.methods.markAsCompleted = async function() {
  this.status = 'completed';
  return this.save();
};

donationSchema.methods.markAsRefunded = async function() {
  this.status = 'refunded';
  return this.save();
};

module.exports = mongoose.model('Donation', donationSchema); 