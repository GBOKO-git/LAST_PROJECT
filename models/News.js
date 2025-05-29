const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est requis'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  content: {
    type: String,
    required: [true, 'Le contenu est requis']
  },
  summary: {
    type: String,
    maxlength: [200, 'Le résumé ne peut pas dépasser 200 caractères']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['event', 'announcement', 'article', 'press'],
    default: 'announcement'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  publishDate: {
    type: Date
  },
  featuredImage: {
    url: String,
    alt: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  metadata: {
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Indexes
newsSchema.index({ title: 'text', content: 'text' });
newsSchema.index({ status: 1, publishDate: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ tags: 1 });

// Middleware pre-save
newsSchema.pre('save', function(next) {
  if (this.status === 'published' && !this.publishDate) {
    this.publishDate = new Date();
  }
  next();
});

// Méthodes statiques
newsSchema.statics.findPublished = function() {
  return this.find({
    status: 'published',
    publishDate: { $lte: new Date() }
  }).sort('-publishDate');
};

newsSchema.statics.findByCategory = function(category) {
  return this.find({
    category,
    status: 'published',
    publishDate: { $lte: new Date() }
  }).sort('-publishDate');
};

newsSchema.statics.findByTag = function(tag) {
  return this.find({
    tags: tag,
    status: 'published',
    publishDate: { $lte: new Date() }
  }).sort('-publishDate');
};

// Méthodes d'instance
newsSchema.methods.publish = async function() {
  this.status = 'published';
  this.publishDate = new Date();
  return this.save();
};

newsSchema.methods.archive = async function() {
  this.status = 'archived';
  return this.save();
};

newsSchema.methods.incrementViews = async function() {
  this.metadata.views += 1;
  return this.save();
};

module.exports = mongoose.model('News', newsSchema); 