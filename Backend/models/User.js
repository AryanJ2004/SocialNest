const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  socialMediaHandle: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }]
},{ collection: 'social_media' });

module.exports = mongoose.model('User', UserSchema);