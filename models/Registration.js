const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  university: String,
  phoneNumber: String,
  delegateType: String,
  committeePreference1: String,
  committeePreference2: String,
  accommodationRequired: Boolean,
  agreeToTerms: Boolean,
  previousExperience: String,
  createdAt: Date,
  updatedAt: Date
});

module.exports = mongoose.model('Registration', RegistrationSchema);
